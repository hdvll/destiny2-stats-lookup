import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../heading/Heading';

const About = props => {
  return (
    <div className='container'>
      <Heading />
      <div className='about'>
        <div className='about__header'>About the site</div>
        <p>
          This site is made by{' '}
          <a
            href='https://www.hdvll.com/'
            target='_blank'
            className='aboutLink'
            rel='noopener noreferrer'
          >
            hdvll
          </a>
          . I am, just as you probably are, a big fan of Bungie going back to
          the Halo games, Destiny in 2014 and now Destiny 2. I have many
          memories of raiding (Remember the first time you descended into the
          Vault of Glass?) or playing Iron Banner, complaining about horrible
          lag, in the first Destiny with people I met online and now call my
          close friends. I still play with them today and even though the game
          has it's ups and downs I still love it.
        </p>
        <p>
          This site would not exist if not for Bungie's excellent API
          <span>&hearts;</span>. If you want you can check that out on their{' '}
          <a
            href='https://github.com/Bungie-net/api'
            target='_blank'
            className='aboutLink'
            rel='noopener noreferrer'
          >
            Github
          </a>{' '}
          page.
        </p>
        <p>
          The current version of the site is 0.1 and I will keep iterating on
          improvments, bug fixes and new features over time. Please use the{' '}
          <em>Issues</em> section on Github to report problems. You can find the
          source code for this site on{' '}
          <a
            href='https://www.github.com/hdvll/destiny2-stats-lookup'
            className='aboutLink'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
          . Feel free to use it as you see fit in your own projects and I
          appreciate if you link to the original source code if you do.
        </p>
        <p>
          Now &mdash; stop reading this boring stuff and get back to{' '}
          <Link to='/' className='aboutLink'>
            searching
          </Link>{' '}
          your own or other's stats.
        </p>
      </div>
    </div>
  );
};

export default About;
