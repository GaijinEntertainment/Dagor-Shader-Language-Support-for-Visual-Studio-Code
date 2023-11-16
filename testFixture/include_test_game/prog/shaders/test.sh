include "test_inc_1.sh"
include "test_inc_3.sh"
include_optional "test_inc_2.sh"
hlsl {
    #include "test_inc_3.hlsl"
    #include "test_inc_1.hlsl"
    #include <test_inc_1.hlsl>
    #include <../test_inc_1.hlsl>
}
