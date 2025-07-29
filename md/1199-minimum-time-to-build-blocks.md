### Leetcode 1199 (Hard): Minimum Time to Build Blocks [Practice](https://leetcode.com/problems/minimum-time-to-build-blocks)

### Description  
Given a list of blocks, where blocks[i] = t means the iᵗʰ block needs t units of time to build.  
You can assign any worker to build a single block at a time, but you start with only **one worker**.  
You can **split** one worker into two, which costs `split` units of time, and this operation can be done in parallel by multiple workers at once (so, if k workers split, it still only takes `split` time, not `k × split`).  
Calculate the minimum total time to build all blocks.

### Examples  

**Example 1:**  
Input: `blocks = [1]`, `split = 1`  
Output: `1`  
*Explanation: Only one block and one worker; just build it.*

**Example 2:**  
Input: `blocks = [1,2]`, `split = 5`  
Output: `7`  
*Explanation: Split the one worker in 5 units (now 2 workers). Assign each to build a block, which takes max(1,2) = 2 units. Total = 5 + 2 = 7.*

**Example 3:**  
Input: `blocks = [1,2,3,4]`, `split = 1`  
Output: `4`  
*Explanation:  
- Split: worker splits twice in parallel, so after two splits (total time 2), there are 4 workers.  
- Each builds a block (up to 4) in parallel, so time to build is max([1,2,3,4]) = 4.  
- But the splits and builds can overlap.  
Optimal in this case:  
- First split (now two workers, time = 1).  
- Both split in parallel again (now 4 workers, time = 2).  
- All 4 build in parallel, but need only wait for max block time: max([1,2,3,4]) = 4.  
- Total time = 1 (split) + 1 (split again) + 4 (build) = 4 (as the splits are before builds).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try all possible ways to split at every step; recursively decide whether to split or build, for each worker, track time. Clearly exponential and impractical for large n.

- **Greedy idea:**  
  Always split until you have as many workers as the number of blocks, then build all simultaneously. But the cost of splitting might not always justify early splits, especially if split is expensive or block times vary.

- **Optimal (recursive with memoization or DP, or heap):**  
  What if we take the two smallest blocks and combine them into one (with the cost of splitting) in a bottom-up fashion?  
  Another idea:  
  - **Sort blocks in descending order.**  
  - If number of workers ≥ blocks, build all in parallel (time = max(block times)).  
  - If fewer workers, either:  
    - split to double workers (incur split time and double workers), or  
    - start building largest block(s), reducing problem size.  
  - At each step, minimize total time.  
  This can be implemented with DFS + memoization or simulated with a min-heap, always merging smallest tasks (Huffman-style).

### Corner cases to consider  
- Single block (only one block: should just build, no split).
- Large split cost (should avoid excessive splits).
- block times all the same, which could make splitting optimal.
- Large number of small blocks and a small split cost (many splits optimal).
- Very large block with many small ones (build big block first or after splits?).
- Empty list (no blocks).
- Split cost zero (always split to max parallelism).

### Solution

```python
from typing import List
import heapq

def minBuildTime(blocks: List[int], split: int) -> int:
    # If only one block, just build it
    if len(blocks) == 1:
        return blocks[0]

    # Min-heap, as we want to pair smaller tasks
    heapq.heapify(blocks)

    # Simulate merging two smallest "tasks", as splitting is needed to process more workers
    while len(blocks) > 1:
        a = heapq.heappop(blocks)
        b = heapq.heappop(blocks)
        # After split, worker can handle both in parallel (cost: split + max(a, b))
        combined = split + max(a, b)
        heapq.heappush(blocks, combined)

    # The last value in heap is the minimum time
    return blocks[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), as each heap operation (pop/push) takes log n time, and we do O(n) operations.
- **Space Complexity:** O(n), as we maintain a heap of block sizes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you can only split to a fixed number of workers at each split step?  
  *Hint: Think about generalizing to k-way splits; new "merge" logic required.*

- What if the split cost could vary (e.g., depends on worker level or number of splits)?  
  *Hint: Needs DP with additional state for split-cost mapping.*

- Can you output the actual schedule of splits and block builds, not just the minimal time?  
  *Hint: Track operations in a solution tree during computation.*

### Summary
We use a **heap-based greedy approach**, similar to Huffman encoding or optimal merge pattern, to continually combine smaller build tasks, considering the split cost at each "merge". This is an example of **greedy + heap + simulation**. This pattern frequently appears in task scheduling and resource-constrained job finishing, notably in optimal file merge problems and parallel task completion scenarios.