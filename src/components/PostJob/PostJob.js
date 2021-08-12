import React,{ useState ,useEffect} from 'react';
import './PostJob.css';
import {POST_JOB} from '../../Graphql/mutations';
import LoadingScreen from './LoadingScreen';

//Using react-toastify to show a toast message to user whether job is posted
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//importing useMutation hook to wireup our mutation with this hook 
import { useMutation } from '@apollo/client';


/*                           NOTE! 
    -----------------------------------------------------------------
    I'm pre-fixing the 'commitmentId'  and 'company name' in the form fields to makesure that
    user doesn't accidently change these values because in that case mutation will not work 
    it will throw error/exception
    
*/


const PostJob = ()=>{

    //Callback function will be passed to useMutation hook to handle error
    const onJobPostingError = ()=>{
        alert("error occured while posting job! check your network connection and retry!");
    } 

    //Making controlled component by providing values to input fields from react side of app
    const [commitmentId,setCommitmentId] = useState('cjtu8esth000z0824x00wtp1i');
    const [companyName,setCompanyName] = useState('Trimulabs');
    const [title,setTitle] = useState('');
    const [locationNames,setLocationName] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [description,setDescription] = useState('');
    const [applyUrl,setApplyUrl] = useState('');
    const [isJobPosted,setIsJobPosted] = useState(false);

    //Wiring up our mutation with useMutation hook
    const [postJob, { data, loading, error }] = useMutation(POST_JOB,{onError:(error)=>onJobPostingError()});

    //On form submit we will run our mutation
    const onJobPost = (e)=>{
       e.preventDefault();
       if (title && locationNames && userEmail && description && applyUrl){
         postJob({ variables: { title,companyName,commitmentId,locationNames,userEmail,description,applyUrl } });
         //Reseting forms input fields
         setTitle('');
         setLocationName('');
         setUserEmail('');
         setDescription('');
         setApplyUrl('');
       }else{
           alert("please fill every field");
       }
    }

    //Using React side effect/useEffect hook to notify our react app when mutation successfully run
     useEffect(()=>{
        if(data){
            toast(`${data.postJob.title} job is created successfully`);
            setIsJobPosted(true);
        }
     },[data]);

    return (
        <React.Fragment>
            {loading?<LoadingScreen message="job is posting..." className="loading-screen"/>:null}
            {isJobPosted?<ToastContainer autoClose={2200}/>:null}
            <div className="post-job" onSubmit={onJobPost}>
                <h2 className="post-job__header">Post a new job</h2>
                <form className="post-job__form">
                    <div className="field">
                        <label htmlFor="commitment-id" >commitment Id</label>
                        <input id="commitment-id" type="text" value={commitmentId} readOnly className="field__read-only"/>
                    </div>
                    <div className="field">
                        <label htmlFor="company-name" >companyName</label>
                        <input id="company-name" type="text" value={companyName} readOnly className="field__read-only"/>
                    </div>
                    <div className="field">
                        <label htmlFor="title" >Title</label>
                        <input id="title" type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
                    </div>
                    <div className="field">
                        <label htmlFor="location-names">Location Names</label>
                        <input id="location-names" type="text" value={locationNames} onChange={e=>setLocationName(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="user-email">User Email</label>
                        <input id="user-email" type="text" value={userEmail} onChange={e=>setUserEmail(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <input id="description" type="text" value={description} onChange={e=>setDescription(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="apply-url">Apply Url</label>
                        <input id="apply-url" type="text" value={applyUrl} onChange={e=>setApplyUrl(e.target.value)} />
                    </div>
                    <div className="field">
                        <input id="submit-btn" type="submit"/>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default PostJob;