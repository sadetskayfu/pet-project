import { classNames } from '@/shared/helpers/classNames'
import { AuthWindow } from '@/features/Auth'
import styles from './style.module.scss'

const AuthPage = () => {
	return (
		<div className={classNames(styles['page'])}>
			<AuthWindow />
		</div>
	)
}

export default AuthPage
