### Leetcode 3068 (Hard): Find the Maximum Sum of Node Values [Practice](https://leetcode.com/problems/find-the-maximum-sum-of-node-values)

### Description  
Given an undirected tree with n nodes (labeled 0 to n-1) and node values nums (non-negative integers), you are allowed to repeatedly pick any edge `[u, v]` and update both endpoints as:  
nums[u] = nums[u] XOR k  
nums[v] = nums[v] XOR k  
You can apply this operation any number of times.  
Your task is to return the **maximum total sum of node values possible** after any sequence of these operations.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 1]`, `k = 1`, `edges = [[0,1],[1,2]]`  
Output: `6`  
*Explanation:  
You can choose the edge [0,1] once: nums becomes [0,3,1]  
Then, apply [1,2]: nums becomes [0,2,0]  
Apply [0,1] again: nums becomes [1,3,0]  
Keep trying — the max sum happens if you apply edge-[0,1] or edge-[1,2] an odd/even number of times.  
With the right sequence, you can reach [0,2,2] ⇒ sum = 4; but, if you flip [1,2] more, you reach [0,3,1] ⇒ sum = 4.  
But if you always flip both nodes **twice** with each edge, you can reach [1,2,1] ⇒ sum = 4.  
However, if you flip only once, you can achieve [0,3,1], but the sum is not higher.  
But actually, you can reach sum 6 by carefully alternating flips — see further below.*

**Example 2:**  
Input: `nums = [2, 3, 1]`, `k = 3`, `edges = [[0,1],[1,2]]`  
Output: `9`  
*Explanation:  
Flipping [0,1]: nums becomes [1,0,1]  
Flipping [1,2]: nums becomes [1,3,2]  
Now the sum is 1+3+2=6  
An optimized sequence: (details in solution...)*

**Example 3:**  
Input: `nums = [7, 7, 7, 7, 7, 7]`, `k = 3`, `edges = [[0,1],[0,2],[0,3],[0,4],[0,5]]`  
Output: `49`  
*Explanation:  
You can flip each pair, but since all values and k are the same, you either gain or lose the same value on each flip.  
Optimal is to flip an even number of nodes with gain for each edge, and sum maximized at 49.*

### Thought Process (as if you’re the interviewee)  
First, let's understand the operation. When picking an edge, we XOR *both* endpoints with k.  
Applying the operation to the same node *twice* restores its value, since `x ^ k ^ k == x`.

Key observations:
- XOR is its own inverse.  
- You can repeat the operation on any edge any number of times—so for every pair, each node can toggle between their original and "flipped" value.  
- The sum after each operation depends on how many nodes' values you "flip."

Brute-force method:  
- Try all possible sets of nodes to flip (exponential).
- For each, see if you can flip using the operations allowed (possibly too slow for large n).

Optimized approach:  
- *Each time we flip a pair, both endpoints are toggled—so the number of flips per node must follow parity rules.*  
- The *key idea*: maximize sum by flipping those nodes only if `nums[i]^k > nums[i]` (i.e., flipping increases the value).
- But the operation must be applied on pairs, so the number of flips is always even (since each operation affects 2 nodes).  
  - Greedy: For each node, calculate the gain if flipped.
- If the number of nodes with "positive gain" is even, flip all such nodes.
- If odd, exclude the node with the smallest gain, or flip the node with the largest "negative gain".
- In short: Greedy with parity check.

Trade-offs:
- O(n) scan keeps solution optimal and fast.
- Can be tricky to code the parity handling and correct sum bookkeeping.

### Corner cases to consider  
- Only one node (no operations possible).
- All nums[i] are equal.
- k = 0 (no effect when XOR, so sum is unchanged).
- All nums[i]^k is less than original; optimal is do nothing.
- Odd/even number of positive-gain nodes for parity.
- All values strictly increase after flip.

### Solution

```python
from typing import List

class Solution:
    def maximumValueSum(self, nums: List[int], k: int, edges: List[List[int]]) -> int:
        # Initial total sum
        total = 0
        # Number of nodes where flipping increases value
        count = 0
        # Minimum positive gain for parity adjustment
        min_positive_gain = float('inf')
        # Largest negative (loss) gain, for edge cases
        max_negative_gain = float('-inf')
        
        for val in nums:
            flipped = val ^ k
            gain = flipped - val
            total += val
            if gain > 0:
                count += 1
                min_positive_gain = min(min_positive_gain, gain)
                total += gain  # add the benefit immediately
            else:
                max_negative_gain = max(max_negative_gain, gain)
        
        # If count is even, we can use all "profitable" flips
        if count % 2 == 0:
            return total
        # Otherwise, remove the smallest gain (most expensive flip), or add back the best "negative" flip
        return max(total - min_positive_gain, total + max_negative_gain)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited once; all operations are O(1) per node.
- **Space Complexity:** O(1) — Only a constant number of variables for bookkeeping, not counting input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if operations are allowed only a limited number of times?  
  *Hint: Try dynamic programming by tracking flip count and parity.*

- How would this change if the graph is not a tree (e.g., cycles exist)?  
  *Hint: Consider cycle properties—XOR parity constraints may differ.*

- What if k can be different for each edge?  
  *Hint: Need graph traversal or DP; per-edge bookkeeping is required.*

### Summary
The problem is a **bit-manipulation + greedy + parity** pattern.  
The solution identifies where flipping increases value and greedily uses all such flips, honoring the requirement that flips are applied in pairs (parity).  
This is a classic "flip to maximize gain while respecting operation constraints", similar to subarray XOR, and XOR toggling parity in trees.  
Common pattern: Greedy + even/odd constraint, which appears in number partition, token game, or tree re-rooting problems.


### Flashcard
XOR is self-inverse; observe that flipping a node twice restores it, so maximize sum by choosing optimal flip states via DP or greedy pairing.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Bit Manipulation(#bit-manipulation), Tree(#tree), Sorting(#sorting)

### Similar Problems
- Maximum Score After Applying Operations on a Tree(maximum-score-after-applying-operations-on-a-tree) (Medium)
- Find Number of Coins to Place in Tree Nodes(find-number-of-coins-to-place-in-tree-nodes) (Hard)