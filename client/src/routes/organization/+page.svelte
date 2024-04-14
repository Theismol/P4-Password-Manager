<script lang="ts">
    import { page } from '$app/stores';
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';
    
    $: activeUrl = $page.url.pathname;
    let currentTile: number = 0;
</script>

<AppRail class="flex  justify-center " style="color: #08192c;">
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/"  >
            <div class="flex items-center justify-center m-10 " >
                <Icon icon="mdi:home" height="auto" />
            </div>
        </AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
		<svelte:fragment slot="lead">
            <div class="flex items-center justify-center">
                <Icon icon="mdi:account" height="auto"/>
            </div>
        </svelte:fragment>
		<span>Tile 1</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
		<svelte:fragment slot="lead">
            <div class="flex items-center justify-center">
                <Icon icon="mdi:bell" height="auto"/>
            </div>
        </svelte:fragment>
		<span>Tile 2</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
		<svelte:fragment slot="lead">
            <div class="flex items-center justify-center">   
                <Icon icon="mdi:settings" height="auto" />
            </div>
        </svelte:fragment>
		<span>Tile 3</span>
	</AppRailTile>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="https://github.com/Theismol/P4-Password-Manager" target="_blank" title="Account">
            <div class="flex items-center justify-center">
                <Icon icon="mdi:github" height="auto" />
            </div>
        </AppRailAnchor>
	</svelte:fragment>
</AppRail>
