import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconBaseProps } from 'react-icons';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Menu, DropdownMenu } from './styles';

interface IMenu {
  icon: React.ComponentType<IconBaseProps>;
  title: string;
  classNames: string;
  href: string;
}

interface INav {
  menu: IMenu[];
}

const NavMenu: React.FC<INav> = ({ children, menu }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Menu onMouseEnter={() => setOpened(true)}>
        <ul>
          <li className="nav-item">
            <div>
              <div>{children}</div>
              <div>
                <IoMdArrowDropdown />
              </div>
            </div>
            {opened && (
              <DropdownMenu onClick={() => setOpened(false)}>
                <div>
                  <ul className="dropdown">
                    {menu.map(item => {
                      const { classNames, icon: Icon, title, href } = item;
                      return (
                        <li key={title} className={classNames}>
                          <Link to={href}>
                            {Icon && <Icon />}
                            <span>{title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </DropdownMenu>
            )}
          </li>
        </ul>
      </Menu>
    </div>
  );
};

export default NavMenu;
