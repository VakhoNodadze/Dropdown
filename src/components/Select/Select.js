import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  StyledSelect,
  StyledSelectContent,
  StyledOptions,
  StyledOptionItem,
  StyledPlaceholder,
  StyledIcon,
  StyledSpinner,
  StyledCheckbox,
  StyledChevronDown,
  StyledClear
} from './styled';
import Flex from 'components/Flex';

import * as icons from '../Icons'
import Label from '../Label'

import { attachs, sizes, variants } from 'styled/oneOf'

import { generateId } from '../../utils/helpers'
import Element from 'components/Element';

const Select = ({
  name,
  size,
  onOpen,
  onChange,
  onBlur,
  onChangeInput,
  options,
  value,
  excluded,
  disabled,
  placeholder,
  icon,
  loading,
  startsWith,
  search,
  searchRemotely,
  openOnFocus,
  error,
  multiple,
  tags,
  checkbox,
  attached,
  variant,
  hasSearchBox,
  hasExclude,
  onExcludeClick,
  hideOnChoose,
  clearOnChoose,
  clearOnOpen,
  person,
  calendar,
  borderRadius,
  ...rest
}) => {
  const containerRef = useRef()
  const inputRef = useRef()

  const Icon = icon ? icons[icon] : null
  const { Spinner, Check, ChevronDown, ChevronTop, Remove, IconItem, Person } = icons

  const id = generateId()
  const [input, setInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const [personNumber, setPersonNumber] = useState(0)

  const handleClear = e => {
    if (e) {
      e.preventDefault()
    }
    setInput('')
    // setSelectedOptions([])
    onChange('')
    onChangeInput('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleOpen = () => {
    if (disabled) {
      return null
    }
    onOpen()
    if (openOnFocus) {
      setIsOpen(true)
    }
    if (input.length > 0) {
      setIsOpen(true)
    }
    if (clearOnOpen) {
      setInput('')
      onChangeInput('')
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handlePersonNumberMinus = () => {
    if (personNumber > 0) {
      setPersonNumber(prevNumber => prevNumber - 1)
    }
  }

  const handlePersonNumberPlus = () => {
    setPersonNumber(prevNumber => prevNumber + 1)
  }

  const handleChange = (e, val) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(tags ? [...selectedOptions, val] : val)
    if (hideOnChoose) {
      handleClose()
    }
    // setInput(search && !multiple ? val : '')
    if (clearOnChoose) {
      setInput('')
      onChangeInput('')
    }

    if (isFocused) {
      setIsFocused(false)
      onBlur(input)
    }
    // setSelectedOptions(prevSelectedOptions => [...prevSelectedOptions, val])
  }

  const handleOutsideClick = useCallback(
    e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        handleClose()

        setIsFocused(false)
        onBlur(input)
      }
    },
    [containerRef.current]
  )

  const handleKeyPress = () => {
  }


  // const handleBlur = () => {
  //   setIsFocused(false)
  //   onBlur(input)
  // }


  const handleExcludeClick = (e, val) => {
    e.preventDefault()
    e.stopPropagation()
    onExcludeClick(val);
    handleClose();
  }

  // effects
  useEffect(
    () => {
      if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick)
      }
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    },
    [isOpen]
  )

  useEffect(
    () => {
      if (!Array.isArray(options)) {
        return undefined
      }
      if (searchRemotely) {
        return undefined
      }
      let filtered
      if (startsWith) {
        filtered = options.filter(o => {
          const label = String(o.label).toLowerCase()
          const searchInput = input.toLocaleLowerCase().trim()

          return label.startsWith(searchInput)
        })
      } else {
        filtered = options.filter(o => {
          const label = String(o.label).toLowerCase()
          const searchInput = input.toLocaleLowerCase().trim()

          return label.includes(searchInput)
        })
      }
      setFilteredOptions(filtered)
      if (tags && input === ',') {
        setInput('')
      }
    },
    [input]
  )

  useEffect(
    () => {
      if (Array.isArray(options)) {
        setFilteredOptions(options)
      }
    },
    [options]
  )

  useEffect(
    () => {
      if (value !== null) {
        if (Array.isArray(value)) {
          setSelectedOptions(value)
        } else {
          setSelectedOptions(tags ? [...selectedOptions, value] : [value])
        }
      } else {
        setSelectedOptions([])
      }
    },
    [value]
  )

  // renders
  const renderRightAbsolute = () => {
    if (loading) {
      return (
        <StyledSpinner>
          <Spinner/>
        </StyledSpinner>
      )
    }
    if (!loading && !searchRemotely && !disabled) {
      return (
        <StyledChevronDown className="chevron" size={size}>
          {
            isOpen ? <ChevronTop/> :
              <ChevronDown size={size === 'mini' ? 11 : 14}/>
          }
        </StyledChevronDown>
      )
    }
    if (searchRemotely && !multiple && selectedOptions.length > 0) {
      return (
        <StyledClear onClick={e => handleClear(e)}>
          <Remove/>
        </StyledClear>
      )
    }
    return null
  }

  const renderPlaceholderText = () => {
    if (tags && selectedOptions.length > 0) {
      return null
    }
    if ([...selectedOptions, ...excluded].length > 0 && multiple) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: 'black' }}>{placeholder}</div>
          {' '}
          <Label color="primary" size="small">
            {[...selectedOptions, ...excluded].length}
          </Label>
        </div>
      )
    }
    if (selectedOptions.length > 0 && !multiple) {
      const optionFound = options.find(o => o.value === selectedOptions[0])
      return optionFound ?
        <div style={{ color: '#FC6C44', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
          <IconItem name={optionFound.labelLeft} defaultColor='#FC6C44'/>
          <span style={{ marginLeft: 5 }}>{optionFound.label}</span>
        </div>
        :
        <div style={{ color: '#000' }}>{placeholder}</div>
    }
    if (placeholder) {
      return <div style={{ color: '#000' }}>{placeholder}</div>
    }
    return null
  }

  const renderPersonPlaceholderText = () => {
    return personNumber > 0 ?
      <div style={{ color: '#000', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
        <Person/> <span>{personNumber} People</span>
      </div>
      :
      <div style={{ color: '#000', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
        <Person/> <span>{placeholder}</span>
      </div>
  }

  const renderPlaceholder = () => {
    if ((!placeholder || isFocused || input.length > 0) && !hasSearchBox) {
      return null
    }
    return (
      <StyledPlaceholder
        className="placeholder"
        hasIcon={icon}
        active={selectedOptions.length > 0}
        size={size}
        htmlFor={id}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginRight: !searchRemotely ? 18 : 0,
            width: '100%'
          }}
        >
          {person ? renderPersonPlaceholderText() : renderPlaceholderText()}
        </span>
      </StyledPlaceholder>
    )
  }

  const renderOptionItem = item => (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', alignItems: 'center' }}>
      {checkbox && (
        <StyledCheckbox isChecked={selectedOptions.includes(item.value)}
                        excluded={excluded.includes(item.value)}>
          {selectedOptions.includes(item.value) && <Check/>}
          {excluded.includes(item.value) && <Remove color="#fff"/>}
        </StyledCheckbox>
      )}
      {item.labelLeft && (
        <div
          style={{
            zIndex: 10,
            marginRight: 5
          }}
        >
          <IconItem
            name={item.labelLeft}
            activeColor={selectedOptions.includes(item.value) ? '#FC6C44' : 'black'}
            defaultColor={selectedOptions.includes(item.value) ? '#FC6C44' : 'black'}/>
        </div>
      )}
      <span style={{
        maxWidth: '80%',
        opacity: item.disabled ? 0.4 : 1,
        color: selectedOptions.includes(item.value) ? '#FC6C44' : 'black'
      }}>
        {item.heading ? <h5 style={{ color: item.color }}>{item.label}</h5> : item.label}
      </span>
      {hasExclude && (
        <button
          onClick={e => handleExcludeClick(e, item.value)}
        >
          Exclude
        </button>
      )}
    </div>
  )

  const renderOptions = () => {
    if ((options && options.length > 0) || hasSearchBox) {
      return (
        <>
          <StyledOptions
            className="options"
            isOpen={isOpen}
            containerDimensions={containerRef?.current?.getBoundingClientRect()}
          >
            {filteredOptions.map(item => (
              <StyledOptionItem
                key={`${item.value}-${Math.random()}`}
                isSelected={selectedOptions.includes(item.value)}
                onClick={e => (item.disabled || item.heading ? null : handleChange(e, item.value))}
                isHoverable={!item.heading}
                className="item"
              >
                {renderOptionItem(item)}
              </StyledOptionItem>
            ))}
            {filteredOptions.length === 0 && (
              <div style={{ padding: '4px', textAlign: 'center' }}>
                <small style={{ fontSize: '12px', color: 'rgba(0,0,0, .34)' }}>Empty</small>
              </div>
            )}
          </StyledOptions>
        </>
      )
    }
    return null
  }

  const renderColor = () => {
    if (personNumber === 0) {
      return 'rgba(0,0,0,0.07)';
    }
    return 'rgba(0,0,0,1)'
  }

  const renderPersonsGroup = () => {
    return (
      <>
        <StyledOptions
          className="options"
          person
          isOpen={isOpen}
          containerDimensions={containerRef?.current?.getBoundingClientRect()}
        >
          <Flex p={5} justify='between' align='center'>
            <p><Person/> Group Size</p>
            <Flex align='center'>
              <Element
                onClick={handlePersonNumberMinus}
                p={3} border={`1px solid ${renderColor()}`} borderRadius='50%'
                style={{ cursor: 'pointer' }}>
                <IconItem name='Minus' defaultColor={renderColor()} activeColor={renderColor()}/>
              </Element>
              <span style={{ margin: '0 10px' }}>
                  {personNumber}
                  </span>
              <Element onClick={handlePersonNumberPlus}
                       p={3} border='1px solid black' borderRadius='50%' style={{ cursor: 'pointer' }}>
                <IconItem name='Plus' activeColor='#000'/>
              </Element>
            </Flex>
          </Flex>
        </StyledOptions>
      </>
    )
  }
  const renderCalendar = () => {
    return (
      <>
        <StyledOptions
          className="options"
          calendar
          isOpen={isOpen}
          containerDimensions={containerRef?.current?.getBoundingClientRect()}
        >
          <Flex py={10}>
            <p>Group Size</p>
          </Flex>
        </StyledOptions>
      </>
    )
  }

  return (
    <StyledSelect
      ref={containerRef}
      key={name}
      id={name}
      onClick={handleOpen}
      onKeyDown={handleKeyPress}
      disabled={disabled}
      attached={attached}
      isOpen={isOpen}
      size={size}
      hasIcon={icon}
      {...rest}
    >
      <StyledSelectContent className="content"
                           search={search}
                           error={error}
                           size={size}
                           variant={variant}
                           borderRadius={borderRadius}
      >
        {renderPlaceholder()}
        {icon && (
          <StyledIcon>
            <Icon
              color={isOpen || isFocused || selectedOptions.length > 0 ? 'rgba(0, 0, 0, 0.54)' : '#d9d9d9'}/>
          </StyledIcon>
        )}
        {renderRightAbsolute()}
      </StyledSelectContent>
      {/*{renderOptions()}*/}
      {person ? renderPersonsGroup() : renderOptions()}
      {calendar && renderCalendar()}
    </StyledSelect>
  )
}

Select.propTypes = {
  name: PropTypes.string,
  onOpen: PropTypes.func,
  onChange: PropTypes.func,
  onChangeInput: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  excluded: PropTypes.array,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
  startsWith: PropTypes.bool,
  search: PropTypes.bool,
  openOnFocus: PropTypes.bool,
  error: PropTypes.bool,
  multiple: PropTypes.bool,
  tags: PropTypes.bool,
  checkbox: PropTypes.bool,
  disabled: PropTypes.bool,
  searchRemotely: PropTypes.bool,
  attached: PropTypes.oneOf(attachs),
  size: PropTypes.oneOf(sizes),
  variant: PropTypes.oneOf(variants),
  hasSearchBox: PropTypes.bool,
  hasExclude: PropTypes.bool,
  onExcludeClick: PropTypes.func,
  hideOnChoose: PropTypes.bool,
  clearOnChoose: PropTypes.bool,
  clearOnOpen: PropTypes.bool,
  person: PropTypes.bool,
  calendar: PropTypes.bool,
  borderRadius: PropTypes.string
}

Select.defaultProps = {
  name: 'select',
  onOpen: () => {
  },
  onChange: () => {
  },
  onChangeInput: () => {
  },
  onBlur: () => {
  },
  options: [],
  value: null,
  excluded: [],
  placeholder: '',
  icon: null,
  loading: false,
  startsWith: false,
  search: false,
  openOnFocus: true,
  error: false,
  multiple: false,
  tags: false,
  checkbox: false,
  disabled: false,
  searchRemotely: false,
  attached: 'default',
  size: 'default',
  variant: 'default',
  hasSearchBox: false,
  hasExclude: false,
  onExcludeClick: () => {
  },
  hideOnChoose: true,
  clearOnChoose: true,
  clearOnOpen: true,
  person: false,
  calendar: false,
  borderRadius: ''
}

export default React.memo(Select)
