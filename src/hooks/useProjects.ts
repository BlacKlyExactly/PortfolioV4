import { useStaticQuery, graphql } from "gatsby";

const useProjects = (): Project[] => {
    const data = useStaticQuery(graphql`
        query Projects {
            allDatoCmsProject{
                    nodes{
                    link
                    color
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
    color: string
}

export default useProjects;