import { Children } from 'react';
import type { ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';

export interface FlexProps extends ViewProps,
  Pick<
    ViewStyle,
    | 'alignItems'
    | 'flex'
    | 'flexBasis'
    | 'flexDirection'
    | 'flexGrow'
    | 'flexShrink'
    | 'flexWrap'
    | 'justifyContent'
  > {
  flexGap?: number
}

export function Flex({
  children,
  flex,
  flexBasis,
  flexDirection,
  flexGap,
  flexGrow,
  flexShrink,
  flexWrap,
  style,
  ...rest
}: FlexProps) {
  return (
    <View
      {...rest}
      style={[
        {
          flex,
          flexBasis,
          flexDirection,
          flexGrow,
          flexShrink,
          flexWrap,
        },
        style,
      ]}
    >
      {flexGap == null ? (
        children
      ) : Children.map(children, (child, index) => (
        <View style={{ marginBottom: index === Children.count(children) - 1 ? 0 : flexGap }}>
          {child}
        </View>
      ))}
    </View>
  );
}

export function Row(props: Omit<FlexProps, 'flexDirection'>) {
  return <Flex {...props} flexDirection="row" />;
}

export function Column(props: Omit<FlexProps, 'flexDirection'>) {
  return <Flex {...props} flexDirection="column" />;
}
