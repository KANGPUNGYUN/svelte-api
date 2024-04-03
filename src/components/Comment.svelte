<script>
  // 상위 컴포넌트에서 받은 props는 export를 통해 사용할 수 있음
  export let comment;
  export let articleId;
  import {comments, auth} from '../stores'
  import dateView from '../utils/date';

  const onDeleteComment = () => {
    if(confirm('해당 댓글을 삭제하시겠습니까?')) {
      comments.deleteComment(comment.id, articleId)
    }
  }
</script>

<li>
    <div class="comment-top ">
      <div class="comment-top-left  ">
        <p class="p-user" >{comment.userEmail}</p>
        <p class="p-date-comment" >{dateView(comment.createdAt)}</p>
      </div>
      <div class="comment-top-right ">
        {#if comment.userId === $auth.id}
          <button on:click={onDeleteComment}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" ><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
          </button>
        {/if}
      </div>                
    </div>
    <div class="comment-bottom ">
      <p class="whitespace-pre-line">{comment.content}</p>
    </div>
</li>