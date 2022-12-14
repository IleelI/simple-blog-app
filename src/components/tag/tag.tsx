import { capitalizeFirstLetter } from 'utils/string';

import classes from './tag.module.scss';

type TagProps = {
  tag: string;
};

const Tag = ({ tag }: TagProps) => {
  return <li className={classes.tag}>{capitalizeFirstLetter(tag)}</li>;
};

export default Tag;
