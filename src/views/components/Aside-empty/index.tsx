import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiViewDashboardVariant , mdiViewList, mdiViewGrid, mdiFormatListBulletedSquare } from '@mdi/js';
import styles from "./index.module.scss";

export const Aside: React.FC = () => {  	

  return (
    <>
      <aside className={styles['left-sidebar']}>
        <div className={styles['scroll-sidebar']}>
            
            <nav className={styles['sidebar-nav']}>
              <ul id="sidebarnav" className="pt-4">
                <li className={styles['sidebar-item']}>
                  <a className={`${styles['sidebar-link']} waves-effect waves-dark`}
                    href="index.html"
                    aria-expanded="false"
                    >
                     <span> <Icon path={mdiViewDashboardVariant }
                            title="Dashboard"
                      /></span>
                      <span className={styles['hide-menu']}>Dashboard</span>
                  </a>
                </li>

                <li className={`${styles['sidebar-item']} ${styles['selected']}`}>              
                  <a className={`${styles['sidebar-link']} ${styles['has-arrow']} waves-effect waves-dark ${styles['active']}`}                  
                      href="javascript:void(0)"
                      aria-expanded="false"
                      >
                      <span> <Icon path={mdiViewList}
                            title="Списки дел"
                      /></span>
                      <span className={styles['hide-menu']}>Списки дел </span>
                  </a>       
                  <ul aria-expanded="false" className={`${styles['collapse']} ${styles['first-level']} ${styles['in']}`}>
                    <li className={styles['sidebar-item']}>
                      <a 
                        href="javascript:void(0)" 
                        className={styles['sidebar-link']}
                      >
                        <span className={styles['sidebar-icon']}>  <Icon path={mdiFormatListBulletedSquare} size={0.8} /></span>
                        <span className={styles['hide-menu']}> Список покупок </span></a
                      >
                    </li>     
                    <li className={styles['sidebar-item']}>
                      <a 
                        href="javascript:void(0)" 
                        className={styles['sidebar-link']}
                      >
                        <span className={styles['sidebar-icon']}>
                          <Icon path={mdiFormatListBulletedSquare} size={0.8} />
                        </span>
                        <span className={styles['hide-menu']}> Повторяющиеся списки </span></a
                      >
                    </li>               
                  </ul>           
                </li>

                <li className={styles['sidebar-item']}>
                  <a className={`${styles['sidebar-link']} ${styles['has-arrow']} waves-effect waves-dark ${styles['active']}`}
                    href="javascript:void(0)"
                    aria-expanded="false"
                    >
                      <span><Icon path={mdiViewGrid}
                            title="Календари"
                      /></span>
                      <span className={styles['hide-menu']}>Календари разного плана</span>
                  </a>
                  <ul aria-expanded="false" className={`${styles['collapse']} ${styles['first-level']} ${styles['in']}`}>
                    <li className={styles['sidebar-item']}>
                      <a href="javascript:void(0)" className={styles['sidebar-link']}
                        >
                          <span className={styles['sidebar-icon']}><Icon path={mdiViewGrid} size={0.8} /></span>
                        <span className={styles['hide-menu']}> Календарь дней рождения Друзей 1 </span></a
                      >
                    </li>     
                    <li className={styles['sidebar-item']}>
                      <a href="javascript:void(0)" className={styles['sidebar-link']}
                        >
                          <span className={styles['sidebar-icon']}><Icon path={mdiViewGrid} size={0.8} /></span>
                        <span className={styles['hide-menu']}> Календарь учеба в школе дети </span></a
                      >
                    </li>               
                  </ul>
                </li>
                
              </ul>
            </nav>
           
        </div>
      </aside>
         
    </>
  );
};
