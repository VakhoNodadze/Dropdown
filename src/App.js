import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { IconItem, Pizza } from './components/Icons';
import Flex from './components/Flex';
import Element from './components/Element';
import { Dineout } from 'components/Icons';
import { CSSTransitionGroup } from 'react-transition-group';
import Select from './components/Select';


const DINNINGOPTIONS = [
  {
    label: 'Dine out',
    value: 'dine_out',
    labelLeft: 'Dineout'
  },
  {
    label: 'Reservation',
    value: 'reservation',
    labelLeft: 'Reserved'
  },
  {
    label: 'Pick Up',
    value: 'pick_up',
    labelLeft: 'TakeAway'
  },
  {
    label: 'Any',
    value: 'any'
  }
]

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
      scrollerRef?.current.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <Flex height='100vh' direction='column' justify='center' align='center'>

      <Flex width='300px'>
        <Select
          size="mini"
          value={value.role}
          placeholder="Dining Option"
          borderRadius='4px 4px 0 0'
          onChange={(val) => setValue({ ...value, role: val })}
          options={DINNINGOPTIONS}
        />
      </Flex>
      <Flex width='300px'>
        <Flex width='50%'>
          <Select
            size="mini"
            value={value.role}
            placeholder="Calendar"
            borderRadius='0 0 0 4px'
            calendar
            onChange={(val) => setValue({ ...value, role: val })}
          />
        </Flex>
        <Flex width='50%'>
          <Select
            size="mini"
            // name="slackUserRoles"
            value={value.role}
            placeholder="Person"
            borderRadius='0 0px 4px 0'
            person
            onChange={(val) => setValue({ ...value, role: val })}
          />
        </Flex>
      </Flex>
      <Flex direction='column' width='300px'>
        <Flex mt='10px'>
          <CSSTransitionGroup
            transitionName="example">
            <Flex p='5px' mr='5px' bg='#EFEFEF' align='center' borderRadius='5px' ref={filterRef}
              style={{ transition: 'all 0.3s ease-in', position: 'relative' }}>
              <IconItem name='Filter' style={{ marginRight: 5 }} />
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
              <Flex align='center' m='0 5px' key={index}>
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
