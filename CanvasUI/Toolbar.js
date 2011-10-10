/**
 * Created by Steven Schermerhorn.
 * Date: 10/10/11
 * Time: 12:26 PM
 */

var Toolbar = Klass(StackPanel, {
	initialize: function(config) {
		StackPanel.initialize.call(this, config);
		this.ancestors.push('Toolbar');
	}
});