import React, {useState} from 'react'

const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState('');

    const handleForm = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/search/${keyword}`);
        }else{
            history.push('/');
        }
    }
  return (
    <div className='searchform_wrapper'>
        <form onSubmit={handleForm} inline>
                <div className="input-group">
            <div className="form-outline">
                <input  name='q' onChange={(e)=>setKeyword(e.target.value)} type="text" id="form1" className="form-control" />
                <label className="form-label" for="form1">Search product...</label>
            </div>
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            
        </form>
    </div>
 
  )
}

export default SearchBox