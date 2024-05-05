import { useEffect, useState } from 'react'
import Button from '../../components/button'
import Badge from '../../components/badge'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { getAllThreadMessages } from '../../features/smartInbox'
import { isEmpty } from 'lodash'
import Skeleton from 'react-loading-skeleton'
import {
	createIntials,
	getRandamColorForInitials,
	truncateText,
} from '../../utils'
import moment from 'moment'
interface Thread {
	message: any
	defaultOpen: boolean
}

const Thread = ({ message, defaultOpen }: Thread) => {
	const [opened, setOpend] = useState<boolean>(defaultOpen)
	const [bgAndColor, setBgAndColor] = useState<any>({})

	useEffect(() => {
		const colorAndBg = getRandamColorForInitials()
		setBgAndColor(colorAndBg)
	}, [])
	return (
		<div id="email" className="pr-40 pl-24">
			<div className="profilePic" onClick={() => setOpend(!opened)}>
				<div
					className="initial"
					style={{
						backgroundColor: bgAndColor.backgroundColor,
						color: bgAndColor.color,
					}}>
					{createIntials(
						message?.senderName ? message?.senderName : message?.senderEmail
					)}
				</div>
			</div>
			<div className="content">
				<div className="d-flex align-items-center justify-content-between">
					<div>
						<div
							className="d-flex align-items-center "
							onClick={() => setOpend(!opened)}>
							<span className="fs-14 lh-20 font-700">
								{message?.senderName}
							</span>
							<span className="fs-12 lh-18 font-500 neutrals-grey-60 ml-4">
								{` <${message?.senderEmail}>`}
							</span>
						</div>
						{opened ? (
							<div className="fs-12 lh-18 font-500 neutrals-grey-60 d-flex align-items-center">
								<span>
									{message?.emailTo?.split('@')[0] + ','} {message?.emailCC}
								</span>{' '}
								<i
									className="material-icons fs-14 dropdown-toggle"
									aria-expanded="false"
									data-bs-toggle="dropdown">
									arrow_drop_down
								</i>
								<div
									className="dropdown-menu shadow mt-6"
									aria-labelledby="dropdownuser1">
									<div className="emailInfo-dropdown">
										<div className="emailInfo-item">
											<div
												className="fs-14 lh-20 neutrals-grey-60 "
												style={{ textAlign: 'right' }}>
												from:
											</div>
											<div className="fs-14 lh-20 font-500">
												{message?.senderEmail}
											</div>
										</div>
										<div className="emailInfo-item">
											<div
												className="fs-14 lh-20 neutrals-grey-60 "
												style={{ textAlign: 'right' }}>
												to:
											</div>
											<div className="fs-14 lh-20 font-500">
												{message?.emailTo}
											</div>
										</div>
										<div className="emailInfo-item">
											<div
												className="fs-14 lh-20 neutrals-grey-60 "
												style={{ textAlign: 'right' }}>
												date:
											</div>
											<div className="fs-14 lh-20 font-500">
												{moment(message?.messsageDatetime).format(
													'ddd, D MMM, hh:mm A'
												)}
											</div>
										</div>
										<div className="emailInfo-item">
											<div
												className="fs-14 lh-20 neutrals-grey-60 "
												style={{ textAlign: 'right' }}>
												subject:
											</div>
											<div className="fs-14 lh-20 font-500">
												{message?.subjectLine}
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
					<div
						className="fs-12 lh-18 font-500 neutrals-grey-60 d-flex align-items-center"
						onClick={() => setOpend(!opened)}>
						<span>
							{moment(message?.messsageDatetime).format('ddd, D MMM, hh:mm A')}
						</span>
						{/* {opened && (
							<span className="icon-container">
								<i className="material-icons fs-20 neutrals-grey-50 icon-container ml-4">
									more_vert
								</i>
							</span>
						)} */}
					</div>
				</div>
				{opened ? (
					<></>
				) : (
					<div
						className="mt-2 fs-12 lh-18 font-500 neutrals-grey-60"
						onClick={() => setOpend(!opened)}
						dangerouslySetInnerHTML={{
							__html: truncateText(message?.snippet, 120, 110),
						}}></div>
				)}
				{opened ? (
					<>
						<div
							className="mt-16"
							dangerouslySetInnerHTML={{
								__html: message.body,
							}}></div>
						{/* <div className="mt-16">
							<span className="threeDotPill">
								<i className="material-icons fs-16 neutrals-grey-80">
									more_horiz
								</i>
							</span>
						</div> */}
						{/* <div className="mt-24 actionController">
							<Button
								value="Reply"
								icon={
									<i className="material-icons fs-16 align-middle">reply</i>
								}
								iconPlacement="left"
								classNames="cylinderical-w size-s"
							/>
							<Button
								value="Reply All"
								icon={
									<i className="material-icons fs-16 align-middle">reply_all</i>
								}
								iconPlacement="left"
								classNames="cylinderical-w size-s"
							/>
							<Button
								value="Forward"
								icon={
									<i className="material-icons fs-16 align-middle">shortcut</i>
								}
								iconPlacement="left"
								classNames="cylinderical-w size-s"
							/>
						</div> */}
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

const Threads = () => {
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const campaignId = searchParams.get('campaignid')
	const threadId = searchParams.get('tid')
	const [loading, setLoading] = useState<boolean>(false)
	const [allMessages, setAllMessages] = useState<any[]>([])
	const [campaignName, setCampaignName] = useState<string>('')
	const [subjectName, setSubjectName] = useState<string>('')

	const fetchAllMessages = async () => {
		try {
			setLoading(true)
			const resp = await dispatch(
				getAllThreadMessages({ campaignId, threadId })
			)
			if (resp.payload) {
				setCampaignName(resp.payload?.campaignName)
				setAllMessages(resp.payload?.allThreads)
				setSubjectName(resp.payload?.subjectLine)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!isEmpty(threadId) && !isEmpty(campaignId)) {
			fetchAllMessages()
		} else {
			setAllMessages([])
			setCampaignName('')
			setSubjectName('')
		}
	}, [threadId, campaignId])

	return (
		<div className="summaryContainer">
			{loading ? (
				<div className="d-flex align-items-center pt-24 pr-40 pl-24">
					<span className="fs-20 lh-28 font-500 neutrals-grey-80 mr-8">
						<Skeleton width={200} height={30} borderRadius={60} />
					</span>
					<Skeleton width={100} height={20} />
				</div>
			) : (
				<div className="d-flex align-items-center pt-24 pr-40 pl-24 ">
					<span className="fs-20 lh-28 font-500 neutrals-grey-80 mr-8">
						{subjectName}
					</span>
					{campaignName ? (
						<Badge
							textContent={campaignName}
							type="accent"
							color="neutral"
							hasLeadingIcon={true}
							leadingIcon={
								<i className="material-icons fs-20 neutrals-grey-60 align-middle mr-4">
									layers
								</i>
							}
							size="medium"
						/>
					) : (
						<></>
					)}
				</div>
			)}
			{!loading
				? allMessages?.map((message, index) => (
						<div key={message?.messageId}>
							<Thread
								message={message}
								defaultOpen={allMessages.length - 1 == index}
							/>
							<div className="hr pr-40 pl-24 mt-24"></div>
						</div>
				  ))
				: Array.from(new Array(9)).map((skeleton) => (
						<>
							<div id="email" className="pr-40 pl-24">
								<Skeleton width={40} height={40} borderRadius={'50%'} />
								<div className="content">
									<div className="d-flex align-items-center justify-content-between">
										<div>
											<div className="d-flex align-items-center ">
												<span className="fs-14 lh-20 font-700">
													<Skeleton width={120} height={20} borderRadius={20} />
												</span>
												<span className="fs-12 lh-18 font-500 neutrals-grey-60 ml-4">
													<Skeleton width={180} height={15} />
												</span>
											</div>
										</div>
										<div className="fs-12 lh-18 font-500 neutrals-grey-60 d-flex align-items-center">
											<Skeleton width={120} height={20} />
										</div>
									</div>
									<Skeleton width={'100%'} className="mt-8" />
								</div>
							</div>
						</>
				  ))}
			{/* remove false when ai assistant is implemented */}
			{false && !loading ? (
				<div className="aiAssistBar">
					<div className="aiIcon neutrals-grey-80">
						<span className="fs-14 lh-20 font-700">AI</span>
						<i className="material-icons fs-10">auto_awesome</i>
					</div>
					<div style={{ width: 'calc(100% - 56px)' }}>
						<div className="fs-14 lh-20 font-600 neutrals-grey-80">
							Smart Assistant
						</div>
						<div className="fs-12 lh-18 font-500 neutrals-grey-60">
							Smart summary and suggestions for your conversation
						</div>
						<div className="aiCards mt-16">
							<div className="aiCard">
								<div className="fs-12 lh-18 font-600 neutrals-grey-70">
									Summary
								</div>
								<div className="fs-14 lh-20 neutrals-grey-90">
									Supreet pitched Launcheazy’s Omni-channel Outreach Platform to
									Wilson who is interested in the platform, and excited about
									the demo, as his company is struggling to generate leads via
									outreach.
								</div>
							</div>
							<div className="aiCard">
								<div className="fs-12 lh-18 font-600 neutrals-grey-70">
									Summary
								</div>
								<div className="fs-14 lh-20 neutrals-grey-90">
									Supreet pitched Launcheazy’s Omni-channel Outreach Platform to
									Wilson who is interested in the platform, and excited about
									the demo, as his company is struggling to generate leads via
									outreach.
								</div>
							</div>
						</div>
						<Button
							icon={
								<i className="material-icons align-middle fs-20">
									auto_awesome
								</i>
							}
							iconPlacement="left"
							value="Generate a reply"
							classNames="mt-16 cylinderical-o"
						/>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default Threads
