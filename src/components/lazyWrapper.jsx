import { Suspense } from "react";
import PropTypes from "prop-types";

export default function LazyWrapper({children}){
    return (
        <Suspense fallback={<div>loading...</div>}>

      {children}
        </Suspense>
    )
}


LazyWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
