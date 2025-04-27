import {
    Field,
    FieldBorderPlacement,
    FieldSize,
    FieldVariant,
    HTMLFieldProps,
} from '@/shared/ui/Field'
import {
    forwardRef,
    memo,
    ReactElement,
    ReactNode,
    TextareaHTMLAttributes,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useMergeRefs } from '@floating-ui/react'
import styles from './style.module.scss'

type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange'>

export interface TextAreaProps extends HTMLTextAreaProps {
    className?: string
    label: string
    labelId?: string
    variant?: FieldVariant
    size?: FieldSize
    borderPlacement?: FieldBorderPlacement
    maxHeight?: number
    hiddenLabel?: boolean
    helperText?: string
    helperTextIds?: string[]
    actions?: (ReactElement | null)[]
    startAdornment?: ReactNode
    errored?: boolean
    fullWidth?: boolean
    fieldRef?: React.RefObject<HTMLDivElement>
    fieldProps?: HTMLFieldProps
    onChange: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea = memo(
    forwardRef(
        (props: TextAreaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
            const {
                className,
                label,
                labelId: externalLabelId,
                value: controlledValue,
                variant,
                size,
                borderPlacement,
                maxHeight = 200,
                hiddenLabel,
                helperText,
                helperTextIds: externalHelperTextIds = [],
                actions,
                startAdornment,
                tabIndex = 0,
                fullWidth,
                rows = 1,
                onChange: controlledOnChange,
                onFocus,
                onBlur,
                onMouseDown,
                errored,
                readOnly,
                disabled,
                required,
                fieldRef,
                fieldProps,
                name,
                ...otherProps
            } = props

            const [isFocused, setIsFocused] = useState<boolean>(false)
            const [uncontrolledValue, setUncontrolledValue] = useState<string>('')

            const value = controlledValue ?? uncontrolledValue
            const onChange = controlledOnChange ?? setUncontrolledValue

            const textareaRef = useRef<HTMLTextAreaElement>(null)

            const mergeRef = useMergeRefs([ref, textareaRef])

            const id = useId()
            const textareaId = id + 'textarea'
            const localLabelId = id + 'label'
            const helperTextId = id + 'helper-text'
            const labelId = externalLabelId ? externalLabelId : localLabelId

            const helperTextIds = useMemo(() => {
                if (helperText) {
                    return [helperTextId, ...externalHelperTextIds]
                } else {
                    return externalHelperTextIds
                }
            }, [externalHelperTextIds, helperTextId, helperText])

            const handleFocus = useCallback(
                (event: React.FocusEvent<HTMLTextAreaElement>) => {
                    setIsFocused(true)
                    onFocus?.(event)
                },
                [onFocus]
            )

            const handleBlur = useCallback(
                (event: React.FocusEvent<HTMLTextAreaElement>) => {
                    setIsFocused(false)
                    onBlur?.(event)
                },
                [onBlur]
            )

            const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
                onChange(event.target.value, event)
            }, [onChange])

            // Update height textarea
            useEffect(() => {
                const textarea = textareaRef.current

                if (textarea) {
                    textarea.style.height = 'auto'

                    const newHeight = textarea.scrollHeight

                    textarea.style.height = `${newHeight / 16}rem`
                }
            }, [value])

            return (
                <Field
                    containerClassName={className}
                    fieldClassName={styles['field']}
                    label={label}
                    labelId={labelId}
                    inputId={textareaId}
                    variant={variant}
                    size={size}
                    borderPlacement={borderPlacement}
                    hiddenLabel={hiddenLabel}
                    errored={errored}
                    focused={isFocused}
                    startAdornment={startAdornment}
                    actions={actions}
                    helperText={helperText}
                    helperTextId={helperTextId}
                    targetFocusRef={textareaRef}
                    disabled={disabled}
                    required={required}
                    fullWidth={fullWidth}
                    ref={fieldRef}
                    textField
                    onMouseDown={(event) => event.preventDefault()}
                    {...fieldProps}
                >
                    <div className={styles['container']}>
                    <textarea
                        className={styles['textarea']}
                        id={textareaId}
                        ref={mergeRef}
                        value={value}
                        name={name}
                        disabled={disabled}
                        required={required}
                        readOnly={readOnly}
                        tabIndex={disabled ? -1 : tabIndex}
                        rows={rows}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onMouseDown={(event) => {
                            event.stopPropagation()
                            onMouseDown?.(event)
                        }}
                        aria-describedby={
                            helperTextIds.length > 0
                                ? helperTextIds.join(' ')
                                : undefined
                        }
                        aria-invalid={errored ? 'true' : 'false'}
                        style={{maxHeight: maxHeight / 16 + 'rem'}}
                        {...otherProps}
                    />
                    </div>
                </Field>
            )
        }
    )
)
