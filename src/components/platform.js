import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './ComponentStyle.css';
// import axios_instance from './axios_instance';
import ModuleView from './components/ModuleView.js'
import ModuleDecision from './components/ModuleDecision.js'
import GamePlay from './components/GamePlay.js'

import getUserPlatformInfo from './components/PlatformHelper.js';

const PlatformController=({username, isSignedIn})=>{

    const [platformName, setPlatformName] = useState("");
    const [moduleName, setModuleName] = useState("");
    const [pageName, setPageName] = useState("");

    let { platformId } = useParams();
    const [moduleId, setModuleId] = useState("");
    const [pageId, setPageId] = useState("");
    const [pageEntry, setPageEntry] = useState("");

	const [userPlatformInfo, setUserPlatformInfo]=useState(
    {
        completeId:[],
        ownPlatform:false,
        score: 0,
        modulesCompleted: 0,
        badges: [false, false, false, false],
    });
    const [platform, setPlatform] = useState({})

	useEffect(
        ()=>{
			getUserPlatformInfo(isSignedIn, platformId)
			.then((res)=>{
                console.log(res.data);
				setUserPlatformInfo(res.data);
			})
			.catch(err=>console.log(err));
        },[username, isSignedIn, platformId]
    );

    function setAction(action)
    {
        if (action.actionType === undefined || action.actionType===null 
            || !(platform.platformId === platformId))
            return;
        if (action.actionType === "P")
        {
            setPageId(action.target);
        }
        else if (action.actionType === "S")
        {
            //by changing the object, we allow for rerenders
            let newUPinfo = { ... userPlatformInfo };

            //now let's find this module's progress
            let element = newUPinfo.completeId.find(e => e.moduleId === moduleId);
            if (element === undefined)
            {
                element = {
                    completed: false,
                    moduleId: moduleId,
                    moduleScore: 0,
                    entryPoints: []
                };
                newUPinfo.completeId.push(element);
            }

            //and this entry point's progress
            let entryPoint = element.entryPoints.find(e => e.pageId === pageEntry);
            if (entryPoint === undefined)
            {
                entryPoint = {
                    pageId: pageEntry,
                    score: 0
                };
                element.entryPoints.push(entryPoint);
            }

            //calculate and assign score delta
            let oldScore = entryPoint.score;
            let newScore = parseInt(action.target);

            let delta = newScore-oldScore;
            delta = delta < 0? 0 : delta;

            entryPoint.score += delta;
            element.moduleScore += delta;
            newUPinfo.score += delta;

            //now housekeep badges

            let milestones = Math.floor((newUPinfo.modulesCompleted / platform.modules.length) * 4);
            for (let i = 0; i < milestones; i++)
            {
                newUPinfo.badges[i] = true;
            }
            //now housekeep modulesCompleted

            let cur_module = platform.modules.find(e => e.moduleId === moduleId);
            if (element.moduleScore >= cur_module.completionScore)
            {
                element.completed = true;
                newUPinfo.modulesCompleted += 1;
            }   

            console.log(newUPinfo);
            if (isSignedIn)
            {
                //TODO: save
            }
            setUserPlatformInfo(newUPinfo);
        }
        else
        {
            console.log(action);
            alert("Invalid Action Type");
        }
    };
    if (moduleId === "")
    {
        return (
            <ModuleView username={username} isSignedIn={isSignedIn} isEdit={false} 
            platformId={platformId} platform={platform} setPlatform={setPlatform}
            userPlatformInfo={userPlatformInfo}
            platformName={platformName} setPlatformName = {setPlatformName}
            setModuleName={setModuleName} setModuleId={setModuleId}/>
        );
    }
    else if (pageId === "")
    {
        return (
            <ModuleDecision username={username} isSignedIn={isSignedIn} isEdit={false} 
                userPlatformInfo={userPlatformInfo} setModuleId={setModuleId}
                platformName={platformName} moduleName = {moduleName}
                platformId={platformId} moduleId = {moduleId}
                setPageName={setPageName} setPageId={setPageId}
                setPageEntry={setPageEntry}/>
        );
    }
    else
    {
        return (
            <GamePlay username={username} isSignedIn={isSignedIn} isEdit={false} 
            setAction={setAction} setPageName={setPageName}
            platformName={platformName} moduleName={moduleName} pageName={pageName}
            platformId={platformId} moduleId={moduleId} pageId={pageId} />
        );
    }
};



export default PlatformController;