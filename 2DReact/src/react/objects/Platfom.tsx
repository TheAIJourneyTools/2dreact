import { PLATFORM_HEIGHT } from '../../core/constants';

const platfomStyleBase: React.CSSProperties = {
  width: '80px',
  height: PLATFORM_HEIGHT,
  background: 'lightblue',
  borderRadius: '10px',
};

export default function Platfom({
  width = '80px',
  marginLeft,
  marginRight,
}: {
  width?: string;
  marginLeft?: string;
  marginRight?: string;
}) {
  return (
    <div
      style={{ ...platfomStyleBase, width, marginLeft, marginRight }}
      data-isplatform
    ></div>
  );
}
