import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  StyledSelect,
  StyledSelectContent,
  StyledInput,
  StyledOptions,
  StyledOptionItem,
  StyledPlaceholder,
  StyledIcon,
  StyledSpinner,
  StyledCheckbox,
  StyledChevronDown,
  StyledClear,
  StyledSearchBox
} from './styled';

import * as icons from '../Icons'
import Label from '../Label'

import { attachs, sizes, variants } from 'styled/oneOf'

import { generateId } from '../../utils/helpers'

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
  ...rest
}) => {
  const containerRef = useRef()
  const inputRef = useRef()

  const Icon = icon ? icons[icon] : null
  const { Spinner, Check, ChevronDown, ChevronTop, Remove, IconItem } = icons

  const id = generateId()
  const [input, setInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = e => {
    if (e) e.preventDefault()
    setInput('')
    // setSelectedOptions([])
    onChange('')
    onChangeInput('')
    if (inputRef.current) inputRef.current.focus()
  }

  const handleOpen = () => {
    if (disabled) return null
    onOpen()
    if (openOnFocus) setIsOpen(true)
    if (input.length > 0) setIsOpen(true)
    if (clearOnOpen) {
      setInput('')
      onChangeInput('')
      if (inputRef.current) inputRef.current.focus()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleChange = (e, val) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(tags ? [...selectedOptions, val] : val)
    if (hideOnChoose) handleClose()
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

  const handleSearch = e => {
    setInput(e.target.value)
    onChangeInput(e.target.value)
    if (!isOpen && e.target.value.length > 0) {
      setTimeout(() => {
        setIsOpen(true)
      }, 100)
    }
    if (!openOnFocus && e.target.value.length === 0) {
      setIsOpen(false)
    }
    return true
  }

  const handleKeyPress = () => {}

  const handleFocus = () => {
    // if (isFocused) {
    //   onBlur(input)
    // }
    // setIsFocused(!isFocused)
    setIsFocused(true)
  }

  // const handleBlur = () => {
  //   setIsFocused(false)
  //   onBlur(input)
  // }

  const handleRemoveOption = i => {
    const newValues = [...selectedOptions]
    newValues.splice(i, 1)
    onChange(newValues)
  }

  const handleInputKeyDown = e => {
    const val = e.target.value
    const { key } = e
    if (key === 'Enter') e.preventDefault()
    if (tags) {
      if (key === ',' && val) {
        onChange([...selectedOptions, val])
        setInput('')
      } else if (key === 'Backspace' && !val) {
        handleRemoveOption(selectedOptions.length - 1)
      }
    }
  }

  const handleExcludeClick = (e, val) => {
    e.preventDefault()
    e.stopPropagation()
    onExcludeClick(val);
    handleClose();
  }

  // effects
  useEffect(
    () => {
      if (isOpen) document.addEventListener('mousedown', handleOutsideClick)
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    },
    [isOpen]
  )

  useEffect(
    () => {
      if (!Array.isArray(options)) return undefined
      if (searchRemotely) return undefined
      let filtered = []
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
      if (tags && input === ',') setInput('')
    },
    [input]
  )

  useEffect(
    () => {
      if (Array.isArray(options)) setFilteredOptions(options)
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
          <Spinner />
        </StyledSpinner>
      )
    }
    if (!loading && !searchRemotely && !disabled) {
      return (
        <StyledChevronDown className="chevron" size={size}>
          {
            isOpen ? <ChevronTop /> :
                <ChevronDown size={size === 'mini' ? 11 : 14} />
          }
        </StyledChevronDown>
      )
    }
    if (searchRemotely && !multiple && selectedOptions.length > 0) {
      return (
        <StyledClear onClick={e => handleClear(e)}>
          <Remove />
        </StyledClear>
      )
    }
    return null
  }

  const renderPlaceholderText = () => {
    if (tags && selectedOptions.length > 0) return null
    if ([...selectedOptions, ...excluded].length > 0 && multiple)
      return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{placeholder}</div>{' '}
          <Label color="primary" size="small">
            {[...selectedOptions, ...excluded].length}
          </Label>
        </div>
      )
    if (selectedOptions.length > 0 && !multiple) {
      const optionFound = options.find(o => o.value === selectedOptions[0])
      return optionFound ? optionFound.label : placeholder
    }
    if (placeholder) return placeholder
    return null
  }

  const renderPlaceholder = () => {
    if ((!placeholder || isFocused || input.length > 0) && !hasSearchBox) return null

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
          {renderPlaceholderText()}
        </span>
      </StyledPlaceholder>
    )
  }

  const renderTags = () => {
    if (selectedOptions.length > 0) {
      return (
        <>
          {selectedOptions.map((item, index) => {
            const option = options.find(o => o.value === item)
            return (
              <Label onRemove={() => handleRemoveOption(index)} style={{ margin: 2 }}>
                {option ? option.label : item}
              </Label>
            )
          })}
        </>
      )
    }
    return null
  }

  const renderSearchBox = () => {
    return (
      <div style={{ padding: '6px 12px 12px 12px' }}>
        <StyledSearchBox
          id={id}
          ref={inputRef}
          onChange={handleSearch}
          onKeyDown={handleInputKeyDown}
          value={input}
          placeholder="Search..."
          autoFocus
        />
      </div>
    )
  }

  const renderOptionItem = item => (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', alignItems: 'center' }}>
      {checkbox && (
        <StyledCheckbox isChecked={selectedOptions.includes(item.value)} excluded={excluded.includes(item.value)}>
          {selectedOptions.includes(item.value) && <Check />}
          {excluded.includes(item.value) && <Remove color="#fff" />}
        </StyledCheckbox>
      )}
      {item.labelLeft && (
          <div
              style={{
                zIndex: 10,
                marginRight: 5,
                fill: 'red'
              }}
          >
            <IconItem
                name={item.labelLeft}
                activeColor={selectedOptions.includes(item.value) ? 'red' : 'black'}
                defaultColor={selectedOptions.includes(item.value) ? 'red' : 'black'} />
          </div>
      )}
      <span style={{
        maxWidth: '80%',
        opacity: item.disabled ? 0.4 : 1,
        color: selectedOptions.includes(item.value) ? 'red' : 'black' }}>
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
            {hasSearchBox && renderSearchBox()}
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

  return (
    <StyledSelect
      ref={containerRef}
      key={name}
      id={name}
      onClick={() => handleOpen()}
      onKeyDown={handleKeyPress}
      disabled={disabled}
      attached={attached}
      isOpen={isOpen}
      size={size}
      hasIcon={icon}
      {...rest}
    >
      <StyledSelectContent className="content" search={search} error={error} size={size} variant={variant}>
        {renderPlaceholder()}
        {icon && (
          <StyledIcon>
            <Icon color={isOpen || isFocused || selectedOptions.length > 0 ? 'rgba(0, 0, 0, 0.54)' : '#d9d9d9'} />
          </StyledIcon>
        )}
        {tags && renderTags()}
        {search && (
          <StyledInput
            id={id}
            ref={inputRef}
            hasRightAbsolute={searchRemotely}
            onChange={handleSearch}
            onFocus={handleFocus}
            // onBlur={handleBlur}
            onKeyDown={handleInputKeyDown}
            value={input}
            isOpen={isOpen}
            hasIcon={icon}
            size={size}
            disabled={disabled}
            hasTags={tags && selectedOptions.length > 0}
            placeholder={tags && selectedOptions.length > 0 ? placeholder : null}
          />
        )}
        {renderRightAbsolute()}
      </StyledSelectContent>
      {renderOptions()}
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
  clearOnOpen: PropTypes.bool
}

Select.defaultProps = {
  name: 'select',
  onOpen: () => {},
  onChange: () => {},
  onChangeInput: () => {},
  onBlur: () => {},
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
  onExcludeClick: () => {},
  hideOnChoose: true,
  clearOnChoose: true,
  clearOnOpen: true
}

export default React.memo(Select)
