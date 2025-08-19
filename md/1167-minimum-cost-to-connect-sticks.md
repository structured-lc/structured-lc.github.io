### Leetcode 1167 (Medium): Minimum Cost to Connect Sticks [Practice](https://leetcode.com/problems/minimum-cost-to-connect-sticks)

### Description  
You are given an array of positive integers where each element represents the length of a stick. You can connect any two sticks of lengths X and Y, and the cost to connect them is X + Y. The newly formed stick replaces the two you connected. Your goal is to keep connecting sticks until only one stick remains, minimizing the total cost to do so. The task is to find the **minimum total cost** required to connect all the sticks into one.

### Examples  

**Example 1:**  
Input: `sticks = [2,4,3]`  
Output: `14`  
*Explanation: Combine 2 and 3 (cost 5), now sticks = [4,5]. Then combine 4 and 5 (cost 9), total cost = 5 + 9 = 14.*

**Example 2:**  
Input: `sticks = [1,8,3,5]`  
Output: `30`  
*Explanation: Combine 1 and 3 (cost 4), sticks = [4,5,8]. Combine 4 and 5 (cost 9), sticks = [9,8]. Combine 9 and 8 (cost 17), total = 4 + 9 + 17 = 30.*

**Example 3:**  
Input: `sticks = [5]`  
Output: `0`  
*Explanation: Only one stick, no connections needed, so cost is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible ways to connect the sticks and find the one with minimum cost. This is not feasible due to the combinatorial explosion for larger inputs.
- **Observation:** At each connection, choosing the smallest two sticks minimizes the future cost, since their sum will be added to another stick in later steps.
- **Optimal solution:** Use a **min-heap** (priority queue). In each step:
    - Remove the two smallest sticks.
    - Add their lengths for this step’s cost, accumulate this to the total.
    - Insert the combined stick back into the heap.
    - Continue until only one stick remains.
- **Why min-heap:** It guarantees efficient retrieval of the two smallest sticks (O(log n) operations), and greedy always using the smallest two yields the global minimum cost for the sum of connections, similar to Huffman encoding.

### Corner cases to consider  
- Empty array: should return 0 as there's nothing to connect (edge case, but input constraint is at least 1 stick).
- Single stick: cost should be 0, nothing to connect.
- All sticks with the same length.
- Input with very large stick values.
- Only two sticks.

### Solution

```python
def minimumCostToConnectSticks(sticks):
    # Min-heap to always access two smallest sticks quickly
    import heapq
    heapq.heapify(sticks)
    total_cost = 0
    
    # Keep connecting the two smallest sticks until one stick remains
    while len(sticks) > 1:
        first = heapq.heappop(sticks)      # smallest stick
        second = heapq.heappop(sticks)     # next smallest stick
        cost = first + second
        total_cost += cost                 # accumulate total cost
        heapq.heappush(sticks, cost)       # push the new combined stick back
    return total_cost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), because each heappop and heappush operation is O(log n), and we do this n - 1 times (each combination step).
- **Space Complexity:** O(n), to store the heapified sticks array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted the k highest intermediate connection costs, not just the sum?
  *Hint: Track each step’s cost in a separate array, then sort or select the top-k.*
- How would you modify the solution if you were allowed to connect more than two sticks at a time?
  *Hint: Would the greedy property still apply, or might connecting more than two sometimes be optimal?*
- Can you do this in a distributed or parallel manner for very large inputs?
  *Hint: Think about batching minimums or merging sorted groups.*

### Summary
This problem is best solved using a **min-heap** and a **greedy algorithm** pattern. Repeatedly connecting the two smallest elements at each step ensures the minimal possible buildup in connection cost, as in classic problems like Huffman encoding. This approach is common in minimum spanning tree-like problems and greedy optimization challenges where local optimal choices yield a global optimum.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Minimum Cost to Merge Stones(minimum-cost-to-merge-stones) (Hard)