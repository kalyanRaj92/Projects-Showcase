const ProjectsHeader = props => {
  const {categoriesList, activeCategoryId, updateCategoryId} = props

  const onChangeCategoryList = event => {
    updateCategoryId(event.target.value)
  }
  return (
    <div className="headerContainer">
      <select value={activeCategoryId} onChange={onChangeCategoryList}>
        {categoriesList.map(eachCategory => (
          <option key={eachCategory.id} value={eachCategory.id}>
            {eachCategory.displayText}
          </option>
        ))}
      </select>
    </div>
  )
}
export default ProjectsHeader
