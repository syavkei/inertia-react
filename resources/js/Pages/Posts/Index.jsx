import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Index({ auth, posts }) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            title: "",
            body: "",
        });

    const page = usePage();

    useEffect(() => {
        if (page?.props?.message?.body) {
            toast(page.props.message.body, {
                type: page.props.message.type,
                position: "top-right",
            });
        }
    }, [page.props.message]);

    function submit(e) {
        e.preventDefault();
        post(route("posts.store"), {
            onSuccess: () => {
                reset();
                // toast.success("Post saved successfuly", {
                //     position: "top-right",
                // });
            },
        });
    }

    function refreshPosts(e) {
        // router.get(
        //     route("posts.index"),
        //     {},
        //     {
        //         only: ["posts"],
        //         preserveScroll: true,
        //     }
        // );
        router.visit(route("posts.index"), {
            only: ["posts"],
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head>
                <title>Posts</title>
                <meta name="description" content="Posts Index" />
            </Head>

            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <form className="mb-8" onSubmit={submit}>
                            <label className="sr-only">Title</label>
                            <input
                                name="title"
                                id="title"
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mb-3"
                                placeholder="Title"
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                value={data.title}
                                onFocus={() => clearErrors("title")}
                            />
                            {errors.title && (
                                <p className="text-red-500">{errors.title}</p>
                            )}
                            <label className="sr-only">Body</label>
                            <textarea
                                name="body"
                                id="body"
                                rows="5"
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mb-3"
                                placeholder="Body"
                                onChange={(e) =>
                                    setData("body", e.target.value)
                                }
                                value={data.body}
                                onFocus={() => clearErrors("body")}
                            ></textarea>
                            {errors.body && (
                                <p className="text-red-500">{errors.body}</p>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className={`bg-gray-700 px-4 py-2 rounded-md text-white font-medium ${
                                    processing && "opacity-25"
                                }`}
                            >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="py-3 flex justify-center">
                <button
                    className="text-sm text-indigo-700"
                    onClick={refreshPosts}
                >
                    Refresh Posts
                </button>
                {/* <Link
                    href={route("posts.index")}
                    only={["posts"]}
                    preserveScroll
                    className="text-sm text-indigo-700"
                    onClick={refreshPosts}
                    type="button"
                >
                    Refresh Posts
                </Link> */}
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {posts.data.map((post) => {
                        return (
                            <div
                                className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5 mb-3"
                                key={post.id}
                            >
                                <div className="mb-4">
                                    <h3 className="font-bold">{post.title}</h3>
                                    <p className="text-xs">
                                        by {post.user.name}
                                    </p>
                                    <p className="mt-1">{post.body}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
