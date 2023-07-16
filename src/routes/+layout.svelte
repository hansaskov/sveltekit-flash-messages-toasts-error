<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Toast, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const errorToast: ToastSettings = {
		message: '',
		background: 'variant-filled-error'
	};
	import { getFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	const flash = getFlash(page);

	let isGotoNavigated = false;
	afterNavigate(({type}) => {
		isGotoNavigated = ['goto'].includes(type as string);
	})

	flash.subscribe(($flash) => {
		if (!$flash) return;
		if ($flash.pathname != $page.url.pathname) return;
		if (!isGotoNavigated) return;

		if ($flash.type === 'error') {
			errorToast.message = $flash.message;
			toastStore.trigger(errorToast);
		}
	});
</script>

<!-- App Shell -->
<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a class="text-xl uppercase semibold" href="/"> Homepage </a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="/private"> Private </a>
				<a class="btn btn-sm variant-ghost-surface" href="/public"> Public </a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
