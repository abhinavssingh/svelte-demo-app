export type PageSeoFields = {
	pagetitle?: string;
	pagedescription?: string;
	canonicalurl?: string;
	metatitle?: string;
	metadescription?: string;
	ogtitle?: string;
	ogdescription?: string;
	ogimage?: string;
	ogurl?: string;
	ogtype?: string;
};

export type SiteSeoDefaults = {
	sitename?: string;
	defaultTitle?: string;
	defaultdescription?: string;
	defaultcanonical?: string;
	defaultmetatitle?: string;
	defaultmetadescription?: string;
	defaultogtitle?: string;
	defaultogdescription?: string;
	defaultogimage?: string;
	defaultogurl?: string;
	defaultogtype?: string;
};

export type SeoComputed = {
	title: string;
	description?: string;
	canonical: string;
	metatitle?: string;
	metadescription?: string;
	og: {
		title: string;
		description?: string;
		type: string;
		url: string;
		image?: string;
		siteName?: string;
	};
};

function template(str: string, ctx: Record<string, string | undefined>) {
	return str.replace(/\{\{(\w+)\}\}/g, (_, k) => ctx[k] ?? '');
}

export function makeSeo(
	path: string,
	page: PageSeoFields,
	defaults: SiteSeoDefaults,
	origin: string
): SeoComputed {
	const base = defaults.defaultcanonical || origin;
	const canonical = page.canonicalurl || new URL(path || '/', base).toString();

	const title =
		page.pagetitle ||
		(defaults.defaultTitle
			? template(defaults.defaultTitle, {
					pageTitle: page.pagetitle,
					siteName: defaults.sitename
				})
			: defaults.sitename || '');

	const description = page.pagedescription || defaults.defaultdescription;
	const metatitle = page.metatitle || page.pagetitle || defaults.defaultmetatitle;
	const metadescription =
		page.metadescription || page.pagedescription || defaults.defaultmetadescription;
	const image = page.ogimage || defaults.defaultogimage;

	return {
		title,
		description,
		canonical,
		metatitle,
		metadescription,
		og: {
			title,
			description,
			type: 'website',
			url: canonical,
			image,
			siteName: defaults.sitename
		}
	};
}
