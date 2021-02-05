import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Pizza } from './components/Icons';
import Flex from './components/Flex';
import Element from './components/Element';
import FilterSvg from 'assets/basic/filter.svg';
import { Dineout } from 'components/Icons';
import { CSSTransitionGroup } from 'react-transition-group';
import Select from './components/Select';

function App() {

  const [value, setValue] = useState({
    email: 'test',
    role: 'employee'
  });
  
  const scrollerRef = useRef(null);
  const filterRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll(evt) {
      if(filterRef.current.getBoundingClientRect().right > evt.target.querySelector('div').getBoundingClientRect().left){
        setIsScrolled(true);
      }
      else{
        setIsScrolled(false);
      }
    }

    scrollerRef.current.addEventListener('scroll', handleScroll);

    return function cleanup() {
      scrollerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <Flex height='100vh' direction='column' justify='center' align='center'>

      <Flex width='300px'>
        <Select
          size="mini"
          // name="slackUserRoles"
          value={value.role}
          placeholder="Select Role"
          onChange={(val) => setValue({ ...value, role: val })}
          options={[
            {
              label: 'Employee',
              value: 'employee',
              labelLeft: 'Dineout'
            },
            {
              label: 'Recruiter',
              value: 'recruiter',
              labelLeft: 'Dineout'
            }
          ]}
        />
      </Flex>
      <Flex direction='column' width='300px'>
        <Flex mt='10px'>
          <CSSTransitionGroup
            transitionName="example">
            <Flex p='5px' mr='5px' bg='#EFEFEF' align='center' borderRadius='5px' ref={filterRef}
              style={{ transition: 'all 0.3s ease-in', position: 'relative' }}>
              <img src={FilterSvg} style={{ marginRight: isScrolled ? 0 : 5 }}/>
              <CSSTransitionGroup
                transitionName="example">
                {isScrolled ?
                  <Element bg='#FC6C44' width='14px' height='14px' textAlign='center' textWeight='bold'
                    color='#fff' borderRadius='50%' style={{ position: 'absolute', top: -5, right: -5 }}>4</Element>
                  : null }
              </CSSTransitionGroup>
              <CSSTransitionGroup
                transitionName="example">
                {!isScrolled &&
              <p>
                Filter
              </p>}
              </CSSTransitionGroup>
            </Flex>
          </CSSTransitionGroup>
          <Flex
            align='center'
            style={{ overflowX: 'scroll' }}
            className="scroller" 
            ref={scrollerRef}>
            {[...Array(5)].map((_, index) => (
              <Flex align='center' m='0 5px'>
                <Pizza />
                <span>Pizza</span>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
