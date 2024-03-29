import { renderHook, act } from "@testing-library/react";
import usePostComment from "../usePostComment";
import useShowToast from "../useShowToast";
import useAuthStore from "../../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');
jest.mock('firebase/firestore');
jest.mock('../../store/postStore');
jest.mock('../useShowToast');

arrayUnion.mockResolvedValue({});
doc.mockResolvedValue({});
updateDoc.mockResolvedValue({});
useAuthStore.mockReturnValue({ uid: 8 });

var id1 = 0;
var comment1;
const addComment = (postId, newComment) => {
  id1 = postId;
  comment1 = newComment;
}
usePostStore.mockReturnValue(addComment);

var e1;
var e2;
var e3;
useShowToast.mockImplementation(() => {
  const showToast = (error1, error2, error3) => {
    e1 = error1; 
    e2 = error2; 
    e3 = error3;
  }
  return showToast;
});

describe("usePostComment", () => {
  it("should initialize with correct initial state", () => {
    // Mock useState to return the initial state
    jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, jest.fn()]);

    const { result } = renderHook(() => usePostComment());
    const { isCommenting, handlePostComment } = result.current;

    expect(isCommenting).toBe(false);
    expect(typeof handlePostComment).toBe("function");
  });

  it('should fail when not authorized user', async () => {
    e2 = "t";
    useAuthStore.mockReturnValueOnce(false);
    const { result } = renderHook(() => usePostComment());
    const { isCommenting, handlePostComment } = result.current;

    const postId = 5;
    const comment = "this";

    await act(async () => {
      await handlePostComment(postId, comment);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("You must be logged in to comment");
    expect(e3).toBe("error");
    
    expect(isCommenting).toBe(false);
  });

  it('should fail when unknown error', async () => {
    e2 = "t";
    useAuthStore.mockReturnValueOnce(true);
    usePostStore.mockReturnValueOnce(false);
    const { result } = renderHook(() => usePostComment());
    const { isCommenting, handlePostComment } = result.current;

    const postId = 5;
    const comment = "this";

    await act(async () => {
      await handlePostComment(postId, comment);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("addComment is not a function");
    expect(e3).toBe("error");
    
    expect(isCommenting).toBe(false);
  });

  it('should work', async () => {
    e2 = "t";
    const { result } = renderHook(() => usePostComment());
    const { isCommenting, handlePostComment } = result.current;

    const postId = 5;
    const comment = "this";

    expect(id1).toBe(0);
    expect(comment1).toBeUndefined();

    await act(async () => {
      await handlePostComment(postId, comment);
    });

    expect(id1).toBe(5);
    expect(comment1.comment).toBe(comment);
    expect(comment1.createdBy).toBe(8);
    expect(comment1.postId).toBe(postId);

    expect(e2).toBe("t");
    
    expect(isCommenting).toBe(false);
  });
});