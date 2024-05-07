import './index.css'

const ProjectCard = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails
  return (
    <li className="card">
      <div>
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </li>
  )
}
export default ProjectCard
