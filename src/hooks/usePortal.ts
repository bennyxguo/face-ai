import { useRef, useEffect } from 'react';

/**
 * Creates DOM element to be used as React root.
 */
const createRootElement = (id: string): HTMLElement => {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
};

/**
 * Appends element as last child of body.
 */
function addRootElement(rootElem: Element) {
  if (document.body.lastElementChild) {
    document.body.insertBefore(rootElem, document.body.lastElementChild.nextElementSibling);
  } else {
    document.body.appendChild(rootElem);
  }
}

const usePortal = (id: string) => {
  //Creating the container for putting the modal
  const rootElemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(`#${id}`);
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement(id);

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem);
    }

    // Add the detached element to the parent
    parentElem.appendChild(getRootElem());

    return function removeElement() {
      getRootElem().remove();
      if (!parentElem.childElementCount) {
        parentElem.remove();
      }
    };
  }, [id]);

  /**
   * Lazy load ref, to avoid re-creating the useRef() initial value.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  const getRootElem = (): HTMLElement => {
    if (rootElemRef.current === null) {
      const portalWrapper = document.createElement('div');
      portalWrapper.classList.add('portal-wrapper');
      rootElemRef.current = portalWrapper;
    }
    return rootElemRef.current;
  };

  return getRootElem();
};

export default usePortal;
