import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useAppContext, useKeyPress } from '@/lib/hooks';
import style from '@/styles/dropdown.module.css';

const DropdownOption = (
  props: React.ComponentProps<'button'> & { label: string }
) => (
  <li>
    <button {...props} className={style.dropdownOption}>
      <span>{props.label}</span>
    </button>
  </li>
);

// A proper dropdown like this should really be handled using a portal to break out of parent containers
// otherwise overflow: hidden; on any parent would make this un-useable
// usually would reach for something like this - https://www.radix-ui.com/primitives/docs/components/select
// ...and could/should take generic props that allow it to be 'dropped in' to other projects
// ...and coupling w/ AppContext makes it a pain to unit test
const Dropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [triggerFocused, setTriggerFocused] = useState(false);
  const { regions, regionFilter, filterByRegion } = useAppContext();

  // close on click-outside
  useEffect(() => {
    const close = () => setDropdownOpen(false);
    window.addEventListener('click', close);
    return () => {
      window.removeEventListener('click', close);
    };
  }, []);

  // close on escape key
  useKeyPress('Escape', () => {
		if (triggerFocused && dropdownOpen) {
			setDropdownOpen(false);
		}
	});

  const toggleDropdown = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setDropdownOpen(open => !open);
  };

  const filterButtonHandler = (
    event: React.SyntheticEvent<HTMLButtonElement>,
    region: string | null,
  ) => {
    event.stopPropagation();
    filterByRegion(region);
    setDropdownOpen(false);
  };

  return (
    <div className={clsx(style.dropdown, {[style.openDropdown]: dropdownOpen})}>
      <button
        className={style.dropdownTrigger}
        onClick={toggleDropdown}
        onFocus={() => setTriggerFocused(true)}
        onBlur={() => setTriggerFocused(false)}
        aria-pressed={Boolean(regionFilter)}
        aria-expanded={dropdownOpen}
        aria-controls="ws-filter-dropdown"
        data-cy="dropdown-trigger"
      >
        <span>{regionFilter ? regionFilter : 'Filter By Region'}</span>
        <ChevronDown />
      </button>
      <ul id="ws-filter-dropdown" className={style.dropdownList} data-cy="dropdown-list">
        {Boolean(regionFilter) && (
          <DropdownOption onClick={e => filterButtonHandler(e, null)} label="All" />
        )}
        {regions.map((region: string, index: number) =>  region !== regionFilter && (
          <DropdownOption key={index} onClick={e => filterButtonHandler(e, region)} label={region} />
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
