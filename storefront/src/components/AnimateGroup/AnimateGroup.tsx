import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import 'velocity-animate/velocity.ui';

const enterAnimationDefaults = {
	animation: 'transition.fadeIn',
	stagger: 50,
	duration: 200,
	display: null,
	visibility: 'visible',
	delay: 0
};

const leaveAnimationDefaults = {
	stagger: 50,
	duration: 200,
	display: null,
	visibility: 'visible',
	delay: 0
};
interface ILeaveAnimationDefaults {
	animation: string | object,
	stagger?: number,
	duration?: number,
	display?: boolean | null,
	visibility?: string,
	delay?: number
}

interface IEnterAnimationDefaults {
	animation: string | object,
	stagger?: number,
	duration?: number,
	display?: boolean | null,
	visibility?: string,
	delay?: number
}

const defaultProps = {
	enter: enterAnimationDefaults,
	leave: leaveAnimationDefaults,
	easing: [0.4, 0.0, 0.2, 1],
	runOnMount: true,
	enterHideStyle: {
		visibility: 'visible'
	},
	enterShowStyle: {
		visibility: 'hidden'
	}
};

const AnimateGroup:React.FC<{
	children: React.ReactNode,
	enter?: IEnterAnimationDefaults,
	leave?: ILeaveAnimationDefaults
}> = (props) =>{
	const allProps = {...defaultProps, ...props}
	return (
		<VelocityTransitionGroup
			{...allProps}
			enter={{ ...enterAnimationDefaults, ...props.enter }}
			leave={{ ...leaveAnimationDefaults, ...props.leave }}
		/>
	);
};

export default React.memo(AnimateGroup);
