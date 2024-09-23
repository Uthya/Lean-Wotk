const Loader = () => {

    return (
        <div className='loader'>
            <div className="app-loader ">
                <div className="loader-spin">
                    <span>
                        <div className='loading'>
                            <div className="app-loader">
                                <div className="loader-spin">
                                    <span className="cx-dot cx-dot-spin">
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Loader

      {/* 
 <div className='loader'>
           <div className="app-loader ">
             <div className="loaderSpinner"></div>
           </div>
         </div> */}