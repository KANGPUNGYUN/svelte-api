<script>
    import { onMount } from 'svelte';
    import { articles, currentArticlesPage, loadingArticle, articlePageLock } from '../stores'
    import Article from "./Article.svelte";
    import ArticleLoading from './ArticleLoading.svelte';

    let component
    let element

    onMount(()=>{
        articles.resetArticles();
        articles.fetchArticles();
    })

    $: {
        if(component) {
            element = component.parentNode
            element.addEventListener('scroll', onScroll)
            element.addEventListener('resize', onScroll)
        }
    }

    const onScroll = (e) => {
        const scrollHeight = e.target.scrollHeight
        const clientHeight = e.target.clientHeight
        const scrollTop = e.target.scrollTop
        const realHeight = scrollHeight - clientHeight
        const triggerHeight = realHeight * 0.7

        const triggerComputed = () => {
            return scrollTop > triggerHeight
        }

        // 현재 페이지가 전체페이지보다 작거나 같으면 true 리턴
        const countCheck = () => {
            const check = $articles.totalPageCount <= $currentArticlesPage
            return check
        }

        // countCheck를 이용하여 현재 페이지가 페이지 마지막일 경우 articlePageLock을 true로 해서 이를 통해 더 이상 페이지 증가를 하지 않음
        if(countCheck()){
            articlePageLock.set(true)
        }

        const scrollTrigger = () => {
            return triggerComputed() && !countCheck() && !$articlePageLock
        }

        if(scrollTrigger()) {
            currentArticlesPage.increPage()
        }
    }

</script>

<div class="slog-list-wrap" bind:this={component}>    
    <ul class="slog-ul">
        {#each $articles.articleList as article, index}
            <li class="mb-5">
                <Article {article}/>
            </li>
        {/each}
    </ul>
    {#if $loadingArticle}
        <ArticleLoading />
    {/if}
</div>