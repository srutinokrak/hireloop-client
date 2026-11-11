 import React from 'react';
 
 const BrowseJobsPage = async({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
   
    const search = await searchParams
    const urlSearch = new URLSearchParams(search as Record<string,string>)
    const query = urlSearch.toString()

    console.log('search params',query
        
    );
   
    return (
        <div>
            <h1>Browse jobs</h1>
        </div>
    );
 };
 
 export default BrowseJobsPage;


//  https://www.linkedin.com/jobs/search-results/?currentJobId=4445959551&keywords=nextjs&origin=JOB_SEARCH_PAGE_JOB_FILTER&referralSearchId=uJITSylB6voV5p8onU2JDg%3D%3D&f_SAL=f_SA_id_227001%3A277001%24f_SA_id_226001%3A272015