import React, { PureComponent } from 'react';
import { Menu, Icon, Dropdown,message} from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class ProductMenu extends PureComponent {
  handleProductMenuClick = ({ key}) => {
    //  setLocale(key);
    message.info('Click on menu item.'+key);
  };

  render() {
    const { className } = this.props;
    const ProductMenuList = (
      <Menu className={styles.ProductMenu} selectedKeys={[ProductMenu]} onClick={this.handleProductMenuClick}>
         <Menu.Item key="0"><Icon type="全部产品" />全部产品</Menu.Item>
        <Menu.Item key="1"><Icon type="MQ" />MQ</Menu.Item>
       <Menu.Item key="2"><Icon type="UKafka" />UKafka</Menu.Item>
      <Menu.Item key="3"><Icon type="其他产品" />其他产品</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={ProductMenuList}>
        <span className={classNames(styles.dropDown, className)}> <Icon type="bars" /> 产品管理：
        MQ <Icon type="down" />
        </span>
      </Dropdown>
    );
  }
}