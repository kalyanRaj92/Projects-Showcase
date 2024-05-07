import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectCard from './components/ProjectCard'
import ProjectsHeader from './components/ProjectsHeader'
import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {
    projects: [],
    apiStatus: apiStatusConstants.initial,
    activeCategoryId: categoriesList[0].id,
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeCategoryId} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${activeCategoryId}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.projects.map(eachProject => ({
        id: eachProject.id,
        name: eachProject.name,
        imageUrl: eachProject.image_url,
      }))
      this.setState({
        projects: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateCategoryId = id => {
    this.setState({activeCategoryId: id}, this.getProjects)
  }

  onClickRetry = () => {
    this.getProjects()
  }

  renderProjectsList = () => {
    const {projects, activeCategoryId} = this.state
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
            alt="website logo"
          />
        </div>
        <ProjectsHeader
          categoriesList={categoriesList}
          activeCategoryId={activeCategoryId}
          updateCategoryId={this.updateCategoryId}
        />
        <ul className="itemCard">
          {projects.map(each => (
            <ProjectCard key={each.id} projectDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjectsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default App
