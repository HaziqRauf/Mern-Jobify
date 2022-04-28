import Job from '../models/Job.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, NotFoundError, UnAuthenticatedError} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'

const createJob = async (req, res) => {
  const {position, company} = req.body

  if(!position || !company) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ jobLocation: "my city" })
  res
    .status(StatusCodes.OK)
    .json({jobs, totalJobs: jobs.length, numOfPages: 1})
}

const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  const { company, position } = req.body
  if(!position || !company) {
    throw new BadRequestError('Please provide all values')
  }
  const job = await Job.findOne({ _id: jobId })
  if(!job) {
    throw new NotFoundError(`No job with id:${id}`)
  }
  const updatedJob = await Job.findOneAndUpdate({ _id:jobId },req.body, {
    new: true,
    runValidators: true,
  })
  // check permissions
  checkPermissions(req.user, job.createdBy)
  res.status(StatusCodes.OK).json({ updatedJob })
}

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId })

  if(!job) {
    throw new NotFoundError(`No job with id:${id}`)
  }
  checkPermissions(req.user, job.createdBy)

  await job.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Job deleted' })
}

const showStats = async (req, res) => {
  res.send('show stats')
}

export {createJob, deleteJob, getAllJobs, updateJob, showStats}
