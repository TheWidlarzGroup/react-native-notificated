import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import githubBlackIcon from '../../static/img/githubBlack.png';
import githubWhiteIcon from '../../static/img/githubWhite.png';
import isDarkTheme from '@docusaurus/theme-common';

function HomepageHero() {
  const buttonStyle = isDarkTheme ? styles.heroButtonWhite : styles.heroButtonBlack
  const iconColor = isDarkTheme ? githubWhiteIcon : githubBlackIcon
  const leftLightningColor = isDarkTheme ? styles.whiteLightningLeft : styles.blackLightningLeft
  const rightLightningColor = isDarkTheme ? styles.whiteLightningRight : styles.blackLightningRight
  const leftLineColor = isDarkTheme ? styles.whiteLineLeft : styles.blackLineLeft
  const rightLineColor = isDarkTheme ? styles.whiteLineRight : styles.blackLineRight

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Blazingly super fast RN notification library</h1>
          <h2 className={styles.heroDescription}>Better than your delivery man!</h2>
          <div className={styles.underline}/>
        </div>
        <div className={styles.heroButtons}>
          <a href='docs/intro' className={buttonStyle}>OK, let's go</a>
          <a href='https://github.com/TheWidlarzGroup/react-native-notificated' className={buttonStyle}>
            <img src={iconColor} alt="github icon"  className={styles.githubIcon}/>
            Github
          </a>
        </div>
      </div>
      <div className={styles.heroLogo}>
        <div className={leftLightningColor}/>
        <div className={leftLineColor}/>
        <div className={styles.blueLineLeft}/>
        <div className={styles.blueLineRight}/>
        <div className={rightLineColor}/>
        <div className={rightLightningColor}/>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHero />
    </Layout>
  );
}
