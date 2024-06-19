import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbContainer } from './style';

const Breadcrumb = ({ breadcrumb }) => (
  <BreadcrumbContainer>
    {breadcrumb.map((crumb, index) => (
      <span key={index}>
        <Link to={crumb.path}>{crumb.label}</Link>
        {index < breadcrumb.length - 1 && " > "}
      </span>
    ))}
  </BreadcrumbContainer>
);

export default Breadcrumb;