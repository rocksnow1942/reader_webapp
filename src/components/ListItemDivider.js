import React from "react";
import Divider from "@material-ui/core/Divider";


/**
 * High order component that renders a divider between list items.
 */
const ListItemDivider = ({ children }) => {
    return children.length > 1 ? (
      <>
        {children.slice(0, -1).map((child, idx) => (
          <React.Fragment key={idx}>
            {child}
            <Divider variant="middle" />
          </React.Fragment>
        ))}
        {children[children.length - 1]}
      </>
    ) : (
      <>{children}</>
    );
  };

export default ListItemDivider;