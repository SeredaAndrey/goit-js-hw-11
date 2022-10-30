const SLBConfig = {
  captions: true, //true	bool	show captions if availabled or not
  captionSelector: 'img', //'img'	string or function	set the element where the caption is. Set it to "self" for the A-Tag itself or use a callback which returns the element
  captionType: 'attr', //'attr'	string	how to get the caption. You can choose between attr, data or text
  captionsData: 'alt', //title	string	get the caption from given attribute
  captionPosition: 'bottom', //'bottom'	string	the position of the caption. Options are top, bottom or outside (note that outside can be outside the visible viewport!)
  captionDelay: 250, //int	adds a delay before the caption shows (in ms)
};
export default SLBConfig;
