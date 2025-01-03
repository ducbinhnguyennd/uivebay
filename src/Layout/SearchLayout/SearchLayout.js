import { useToast } from '../../components/useToast/ToastContext'

function SearchLayout () {
  const { searchData } = useToast()
  console.log(searchData)

  return (
    <div className='search-container'>
      <div className='divlichbay'>

      </div>
      <div className='divtimkiem'>

      </div>
    </div>
  )
}

export default SearchLayout
