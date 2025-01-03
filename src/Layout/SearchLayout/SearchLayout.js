import { useToast } from '../../components/useToast/ToastContext'

function SearchLayout () {
  const { searchData,cityfrom,cityto } = useToast()
  console.log(cityto)

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
