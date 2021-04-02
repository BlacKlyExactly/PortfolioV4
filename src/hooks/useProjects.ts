import { useStaticQuery, graphql } from "gatsby";

const useProjects = (): Project[] => {
    const data = useStaticQuery(graphql`
        query Projects {
            allDatoCmsProject{
                    nodes{
                    link
                    color,
                    title,  
                    tags,
                    image {
                        url
                    }
                }   
            }
        }
    `);

    return data.allDatoCmsProject.nodes
}

export type Project = {
    image: {
        url: string
    }
    link?: string,
    color: string,
    title: string,
    tags: string
}

export default useProjects;