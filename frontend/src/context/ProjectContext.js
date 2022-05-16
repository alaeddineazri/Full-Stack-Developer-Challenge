import { createContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {


    return (
        <ProjectContext.Provider value={{

        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContext;