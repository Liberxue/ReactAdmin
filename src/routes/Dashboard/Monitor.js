import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip } from 'antd';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Authorized from '../../utils/Authorized';
import styles from './Monitor.less';
import { Map, Markers } from 'react-amap';
import { applyMiddleware } from 'redux';
import Websocket from 'react-websocket';
class ProductDetail extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      websockerVisible: true,
      count: 90
    };
    // this.state = {
    //   count: 90
    // };
  }

  handleData(data) {
    let result = JSON.parse(data);
    this.setState({count: this.state.count + result.movement});
  }

  render() {
    return (
      <div>
        Count: <strong>{this.state.count}</strong>
        <Websocket url='ws://localhost:8013/ws'
            onMessage={this.handleData.bind(this)}/>
      </div>
    );
  }
}
//export default ProductDetail;

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;
// 辅助函数，随机生成一个坐标
const randomPosition = () => ({
  longitude: 120 + Math.random() * 20,
  latitude: 39 + Math.random() * 20,
});
const plugins = [
  {
    name: 'ToolBar',
    options: {
      visible: true, // 不设置该属性默认就是 true
      onCreated(ins) {
      },
    },
  }
];
//路网图层
class RoadTileLayer extends React.Component{
  constructor(props){
  super(props);
  this.map=props.__map__;
  const visible = !!props.visible;
  this.roadNetLayer=new window.AMap.TileLayer.RoadNet({zIndex:10}); 
  this.map.add([this.roadNetLayer]);
    }
    render(){
      return null;
    }
  }
//Google图层
class GoogleLayer extends React.Component{
	constructor(props){
  	super(props);
    this.map = props.__map__;
    const visible = !!props.visible;
    this.googleLayer = new window.AMap.TileLayer({
        tileUrl:"https://mt{1,2,3,0}.google.cn/maps/vt?lyrs=s@194&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]",
        //Google卫星地图图层           tileUrl:'https://mt{1,2,3,0}.google.cn/maps/vt?lyrs=s@194&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]'
        //高德图层            tileUrl:'https://webst{01,02,03,04}.is.autonavi.com/appmaptile?style=6&x=[x]&y=[y]&z=[z]'
        //地图图层             tileUrl:'https://mt{1,2,3,0}.google.cn/vt/lyrs=m@142&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galil' 
        zIndex:70,
    });     
    this.map.add([this.googleLayer]);
  } 
  render(){
  	return null;
  }
}

//卫星图
class StatLayer extends React.Component{
  constructor(props){
    super(props);
    this.map=props.__map__;
    const visible=!!props.visible;
    this.statelayer=new window.AMap.TileLayer.Satellite({zIndex:10});
    this.map.add([this.statelayer]);
  }
  render(){
    return null;
  }
}
  // use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }
  //
  constructor() {
    super();
    var _this = this;
    this.state = {
    	layerVisible: true,
    };
    this.mapCenter = [116.250766,39.932931];
    this.markers = Array(10)
      .fill(true)
      .map(function(e, i) {
        var position = randomPosition();
        console.log(position)
        return {
          position,
          // 这个属性就可以用来确定点击的是哪个坐标点
          myIndex: i,
        };
      });
    this.markersEvents = {
      click(e, marker) {
        // 通过高德原生提供的 getExtData 方法获取原始数据
        const extData = marker.getExtData();
        console.log(extData);
        const index = extData.myIndex;
        alert(`点击的是第${index}号坐标点`);
        console.log(extData === _this.markers[index]);
      },
    };
    const markerStyle = {
      padding: '5px',
      border: '1px solid #ddd',
      background: '#ddd',
    };
    this.renderMarkerFn = extData => <div style={markerStyle}>{extData.myIndex}</div>;
  }

  toggleVisible() {
    this.setState(prevState => {
      return {
        layerVisible: !prevState.layerVisible,
      };
    });
  }
  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;
    return (
      <Fragment>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="飞机实时监控" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="今日飞机上线"
                    suffix="架"
                    total={numeral(1245).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="本周飞机上线平均率" total="92%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="平均喷洒时间" total={<CountDown target={targetTime} />} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="每秒最快速度"
                    suffix="米"
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Map
                  plugins={plugins}
                  center={this.mapCenter}
                  zoom={4}
                >
               <StatLayer visible={this.state.statelayer}/>
               <GoogleLayer visible={this.state.layerVisible}/>
               <RoadTileLayer visible={this.state.roadNetLayer}/>
               <ProductDetail visible={this.websockerVisible}/>
               <Markers
                    render={this.renderMarkerFn}
                    markers={this.markers}
                    events={this.markersEvents}
                    useCluster
               />
               <div className={styles.mapcopyrightLayer}>MQ © 2018 AutoNavi - GS(2018)1709号</div>
               <div className={styles.maprighttoplaye}>当前在线 123架</div>
                </Map>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card title="飞机故障预测" style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
            <Card
              title="喷洒效率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge title="炸机率" height={180} percent={87} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24}>
            <Card title="飞控固件占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="k3a"
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle="k++"
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle="未知"
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="热门地块分布"
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <TagCloud data={tags} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="厂商分布"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} title="其他厂商" percent={34} />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
