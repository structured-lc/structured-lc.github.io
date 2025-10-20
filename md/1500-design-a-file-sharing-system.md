### Leetcode 1500 (Medium): Design a File Sharing System [Practice](https://leetcode.com/problems/design-a-file-sharing-system)

### Description  
Design a file sharing system. Users can join the system, share specific chunks of files, request missing chunks from others, and leave the system. When a user joins, they get a unique user ID and supply the file chunks they already own. Users can request a specific chunk — if any user already has it, they return a sorted list of all current *user IDs* holding that chunk, and the requesting user will now "own" the chunk as well. If a user leaves, their ID becomes available for reuse, and they relinquish all chunk ownership.

### Examples  
**Example 1:**  
Input: `join([1,2])` → `join([2,3,4])` → `request(1,2)` → `leave(1)` → `join([2,3])`  
Output: `1` → `2` → `[1,2]` → `null` → `1`  
*Explanation:*
- User 1 (first join) has chunks [1,2].
- User 2 has [2,3,4].
- `request(1,2)`: Both 1 and 2 have chunk 2, so return [1,2] (sorted). Requesting user 1 now still has chunk 2 (no change).
- User 1 leaves, ID 1 can be reused.
- Next join, since 1 is available, reused for new user.

**Example 2:**  
Input: `join([])` → `request(2,5)` → `leave(2)`  
Output: `3` → `[]` → `null`
*Explanation:*
- User 3 joins with no chunks. Requests chunk 5, which nobody owns, so empty list returned. Leaves, freeing ID 3.

### Thought Process (as if you’re the interviewee)  
This is a classic resource pooling and ownership-tracking problem.
- When a new user joins: Assign the smallest available user ID. If a previous user left, reuse their ID; otherwise, increment a counter for unique IDs.
- When a user leaves: Free their user ID (so it can be reused) and remove all their chunk ownerships.
- To request a chunk: Find all users who currently own the chunk, sorted by ID. If at least one exists, add the chunk to the requester’s set.

Key data structures:
- Min-heap for reusable IDs (for efficient retrieval of smallest free ID).
- Counter to hand out new IDs if reused ones are unavailable.
- Dictionary mapping user ID → set of chunks owned.

Optimizations:
- All operations need to be efficient even with many users/chunks.
- If system usage is skewed (heavy churn), the reusable ID heap can become large but remains manageable.

### Corner cases to consider  
- User joining with empty chunk list.
- Requesting a chunk that no one owns.
- Multiple users leaving and rejoining (multiple reusable IDs).
- Requesting chunks by a user who already owns it.
- System with 0 users.

### Solution

```python
import heapq
from collections import defaultdict

class FileSharing:
    def __init__(self, m):
        # m: number of different possible chunks (not used internally, but sometimes needed per problem)
        self.reused = []  # Min-heap of reusable IDs
        self.cur = 1      # Next available user ID
        self.user_chunks = defaultdict(set)  # user ID -> set of chunks owned

    def join(self, ownedChunks):
        # Choose smallest ID in reused or generate new
        if self.reused:
            uid = heapq.heappop(self.reused)
        else:
            uid = self.cur
            self.cur += 1
        self.user_chunks[uid] = set(ownedChunks)
        return uid

    def leave(self, userID):
        if userID in self.user_chunks:
            del self.user_chunks[userID]
            heapq.heappush(self.reused, userID)

    def request(self, userID, chunkID):
        # Find all userIDs who own the chunk (excluding requester, per problem statement)
        owners = [uid for uid, chunks in self.user_chunks.items() if chunkID in chunks]
        owners.sort()
        if owners:
            self.user_chunks[userID].add(chunkID)
        return owners
```

### Time and Space complexity Analysis  
- **Time Complexity:**
  - join: O(1) amortized (heap push/pop for small number of reusable IDs)
  - leave: O(1) (heap push, dict delete)
  - request: O(u) where u = number of current users (since need to scan all users for chunk ownership)
- **Space Complexity:**
  - O(u × c) where u = number of users, c = average number of chunks per user
  - Extra for reusable ID heap (up to number of left users)

### Potential follow-up questions (as if you’re the interviewer)  
- How would you optimize chunk-owners lookup if there are thousands of users?  
  *Hint: Maintain a chunk→userIDs reverse index as well.*
- What if chunks can be dynamically updated or revoked from users?  
  *Hint: Update both user-to-chunks and chunk-to-users.*
- How would you scale the system for millions of users and billions of chunks?  
  *Hint: Use distributed storage and indexing, leverage distributed hash tables.*

### Summary
This problem is a clean application of **resource pooling**, **ownership tracking**, and **efficient ID reuse using a min-heap**. The coding pattern matches those used for resource allocation and recycling IDs in large pool-based systems, and similar approaches appear in many distributed or multi-user systems (like seat booking, distributed file sharing, and game lobby management).


### Flashcard
Design a file-sharing system using a min-heap for reusable user IDs and a dictionary to track chunk ownership. Assign the smallest available ID when a user joins, and reuse IDs when users leave.

### Tags
Hash Table(#hash-table), Design(#design), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Data Stream(#data-stream)

### Similar Problems
- Design Twitter(design-twitter) (Medium)