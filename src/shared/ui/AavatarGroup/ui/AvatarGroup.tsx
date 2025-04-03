import { Children, cloneElement, ReactElement } from "react";
import { Avatar, AvatarProps } from "@/shared/ui/Avatar";
import { classNames } from "@/shared/helpers/classNames";
import styles from "./style.module.scss";

type AvatarGroupOrientation = "horizontal" | "vertical";
type AvatarGroupSpacing = "s" | "m";

interface AvatarGroupProps {
  className?: string;
  children: ReactElement[];
  countAvatar?: ReactElement<AvatarProps>;
  maxAvatars?: number;
  maxCount?: number;
  orientation?: AvatarGroupOrientation;
  spacing?: AvatarGroupSpacing;
  style?: React.CSSProperties
}

export const AvatarGroup = (props: AvatarGroupProps) => {
  const {
    className,
    children,
    countAvatar,
    maxAvatars,
    maxCount,
    orientation = "vertical",
    spacing = "m",
    style,
  } = props;

  const renderAvatars = () => {
    const avatars: ReactElement[] = [];

    if (maxAvatars && children.length > maxAvatars) {
      for (let i = 0; i <= maxAvatars - 1; i++) {
        avatars.unshift(children[i]);
      }
    } else {
      for (let i = 0; i < children.length; i++) {
        avatars.unshift(children[i]);
      }
    }

    return Children.map(avatars, (avatar: ReactElement, index) => {
      if (maxAvatars && children.length > maxAvatars && index === 0) {
        let count = children.length - maxAvatars + 1;

        if (maxCount) {
          count = count > maxCount ? maxCount : count;
        }

        return countAvatar ? (
          cloneElement(countAvatar, {
            children: "+" + count,
            alt: "Number of hidden avatars",
          })
        ) : (
          <Avatar size="s" defaultBgColor border="dark" alt="Number of hidden avatars">{"+" + count}</Avatar>
        );
      }
      return cloneElement(avatar);
    });
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[orientation],
    styles[spacing],
  ];

  return (
    <div className={classNames(styles["avatar-group"], additionalClasses)} style={style}>
      {renderAvatars()}
    </div>
  );
};
