### Leetcode 2722 (Medium): Join Two Arrays by ID [Practice](https://leetcode.com/problems/join-two-arrays-by-id)

### Description  
Given two arrays of objects `arr1` and `arr2`, where each object has a unique integer property `id`, return an array that merges both arrays based on their `id`.  
For any object with the same `id` in both arrays, merge their properties—if a property exists in both, the value from `arr2` takes precedence.  
Objects with unique `id`s are included as-is. The result should be sorted in ascending order by `id`.

### Examples  

**Example 1:**  
Input: `arr1 = [{"id":1,"x":2,"y":3}], arr2 = [{"id":1,"y":5,"z":10}]`  
Output: `[{"id":1,"x":2,"y":5,"z":10}]`  
*Explanation: Both arrays have id=1. Properties are merged:*
- *x is from arr1 only → x:2*
- *y: arr1 has 3, arr2 has 5 → y:5 (arr2 takes precedence)*
- *z is from arr2 → z:10*

**Example 2:**  
Input: `arr1 = [{"id":2,"a":3}], arr2 = [{"id":1,"b":2}]`  
Output: `[{"id":1,"b":2}, {"id":2,"a":3}]`  
*Explanation: Both IDs are unique, so both objects are included and sorted by id.*

**Example 3:**  
Input: `arr1 = [{ "id":1, "v":2, "w":3 }, { "id":2, "v":4 }], arr2 = [{ "id":2, "v":3, "x":1 }]`  
Output: `[{"id":1,"v":2,"w":3}, {"id":2,"v":3,"x":1}]`  
*Explanation:*
- *id=1 is unique, so included as-is.*
- *id=2 is present in both, so merge:*
  - *v: arr2 has 3 (overrides arr1's 4)*
  - *w is from arr1 only*
  - *x is from arr2 only*

### Thought Process (as if you’re the interviewee)  
- **Naive (O(n\*m))**: For each item in arr1, scan arr2 for same id. This is slow for large arrays.
- **Optimized**: Use a dictionary (hash map) mapping id → object.
    - Iterate arr1: map id → object.
    - Iterate arr2:
        - If id exists, merge objects. For keys present in both, arr2's value takes precedence.
        - If id does not exist in map, just set arr2's object.
    - At the end, collect all values from the map and sort by id.
- This guarantees no duplicate ids and merges them as required, in O(n + m) time plus sorting.
- Tradeoff: Hash map provides fast lookups and easy merging.

### Corner cases to consider  
- Either array is empty.
- Objects have no properties except id.
- Extra properties only in one array for a given id.
- Arrays with only one object.
- Overlapping ids but distinct non-overlapping properties.
- Already sorted or unsorted inputs (sort at the end).
- Large id gaps or negative ids.
- Property values that are not only integers or strings (e.g., null, lists, nested objects).

### Solution

```python
def join(arr1, arr2):
    # Map to store merged objects by their id
    id_to_obj = {}

    # First, add all arr1 objects to the map
    for obj in arr1:
        # Make a shallow copy so arr2 updates don't mutate arr1's objects
        id_to_obj[obj['id']] = obj.copy()

    # Then, merge in arr2
    for obj in arr2:
        oid = obj['id']
        if oid in id_to_obj:
            # Merge: arr2's values overwrite arr1's if keys overlap
            for key in obj:
                id_to_obj[oid][key] = obj[key]
        else:
            id_to_obj[oid] = obj.copy()
    
    # Return sorted list of the merged objects
    return sorted(id_to_obj.values(), key=lambda x: x['id'])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m + k log k), where n = len(arr1), m = len(arr2), and k = total unique ids. 
  - O(n + m) for building the map,
  - O(k log k) for sorting by id.
- **Space Complexity:** O(n + m) for the map and the result array; essentially proportional to the total number of unique ids/objects stored.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are nested objects or arrays as property values?  
  *Hint: Think about deep vs. shallow merges.*

- Can you solve this without using extra space?  
  *Hint: Consider sorting and merging in place if allowed, or avoiding the hash map if the input arrays are already sorted.*

- How would you handle conflict resolution if arr1 should take precedence, or if you want to merge values instead of just overwriting?  
  *Hint: Consider parameterizing the merge strategy.*

### Summary
This is a **hash map merge pattern**, common in problems requiring deduplication or quick joins by key.  
It’s similar to merging dictionaries/maps by id, handling in-place merging, and can be generalized to many data integration or join-related problems.  
Understanding how to efficiently merge, update and sort based on keys is useful in data processing, database “left join/right join”, and ETL pipelines.