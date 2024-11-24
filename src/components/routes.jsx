
import LazyWrapper from "./lazyWrapper";
import { routePaths } from "./routes.config";
import { HomePage,About,ContactSection } from "./lazyComponent";
import Layout from "./layout";


const routes=[


    {
        path: routePaths.home,
        element:<Layout/>,
        children: [

            {
               index: true,
               element: (
                <LazyWrapper>
                    <HomePage/>
                </LazyWrapper>
               )

            },

            {
                path:"about",
                element: (
                    <LazyWrapper>
                        <About/>
                    </LazyWrapper>
                )
            },
            {
                path:"contact",
                element:  (
                    <LazyWrapper>
                        <ContactSection/>
                    </LazyWrapper>
                )
            },
           
          
        ],
        
       
    }
    

    
]

export default routes;