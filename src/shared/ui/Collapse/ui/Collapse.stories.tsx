import { Meta, StoryObj } from '@storybook/react'
import { Collapse } from './Collapse'
import { Button } from '../../Button'
import { CollapseTrigger } from './CollapseTrigger'
import { CollapseContent } from './CollapseContent'
import { useState } from 'react'

const meta: Meta<typeof Collapse> = {
	title: 'shared/Collapse',
	component: Collapse,
	args: {
		initialOpen: false,
		lazy: false,
		unmount: false,
		disabledClick: false,
	},
}

export default meta

type Story = StoryObj<typeof Collapse>

const CollapseWrapper = (args: any) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', rowGap: '5px' }}>
			<Collapse {...args}>
				<CollapseTrigger>
					<Button>Collapse Trigger 1</Button>
				</CollapseTrigger>
				<CollapseContent>
					<div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px', backgroundColor: 'red', padding: '10px' }}>
						<Button>Button 1</Button>
						<Button>Button 2</Button>
						<Button>Button 3</Button>
					</div>
				</CollapseContent>
			</Collapse>
			<Collapse {...args}>
				<CollapseTrigger>
					<Button>Collapse Trigger 2</Button>
				</CollapseTrigger>
				<CollapseContent>
					<div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px', backgroundColor: 'red', padding: '10px' }}>
						<Button>Button 1</Button>
						<Button>Button 2</Button>
						<Button>Button 3</Button>
					</div>
				</CollapseContent>
			</Collapse>
		</div>
	)
}

const ControlledCollapseWrapper = (args: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '5px' }}>
            <Collapse {...args} open={isOpen} disabledClick>
                <CollapseTrigger>
                    <Button onClick={() => setIsOpen(prev => !prev)}>Collapse Trigger 1</Button>
                </CollapseTrigger>
                <CollapseContent>
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px', backgroundColor: 'red', padding: '10px' }}>
                        <Button>Button 1</Button>
                        <Button>Button 2</Button>
                        <Button>Button 3</Button>
                    </div>
                </CollapseContent>
            </Collapse>
        </div>
    )
}
export const Uncontrolled: Story = {
	render: (args) => CollapseWrapper(args),
}

export const Controlled: Story = {
    render: (args) => ControlledCollapseWrapper(args)
}
